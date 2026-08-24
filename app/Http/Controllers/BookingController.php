<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\BarberProfile;
use App\Models\ClientProfile;
use App\Models\Service;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BookingController extends Controller
{
    // 1. Mostrar la página principal de reservas (Frontend React)
    public function index(Request $request)
    {
        $user = $request->user();
        $clientProfile = $user ? ClientProfile::where('user_id', $user->id)->first() : null;

        return Inertia::render('booking/index', [
            'services' => Service::all(),
            'barbers' => BarberProfile::all(),
            'authClient' => $user ? [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone ?? ($clientProfile->phone ?? ''),
            ] : null,
        ]);
    }

    // 2. Endpoint API para calcular horas disponibles según fecha, barbero y servicio
    public function availability(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'service_id' => 'required|exists:services,id',
            'barber_profile_id' => 'required|exists:barber_profiles,id',
        ]);

        $slots = $this->calculateAvailableSlots(
            $request->query('date'),
            (int) $request->query('service_id'),
            (int) $request->query('barber_profile_id')
        );

        return response()->json(['slots' => $slots]);
    }

    // 3. Guardar la reserva con validación anti-solapamiento
    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'barber_profile_id' => 'required|exists:barber_profiles,id',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required|date_format:H:i',
            'client_name' => 'required|string|max:255',
            'client_email' => 'required|email|max:255',
            'client_phone' => 'required|string|max:20',
            'notes' => 'nullable|string|max:500',
        ]);

        $service = Service::findOrFail($validated['service_id']);
        $startDateTime = Carbon::parse("{$validated['date']} {$validated['time']}");
        $endDateTime = $startDateTime->copy()->addMinutes($service->duration_minutes);

        // Validación estricta en servidor contra choques de hora
        if ($this->hasOverlap($validated['barber_profile_id'], $startDateTime, $endDateTime)) {
            return back()->withErrors([
                'time' => 'El horario seleccionado ya no está disponible. Por favor elige otro.',
            ]);
        }

        DB::transaction(function () use ($validated, $service, $startDateTime, $endDateTime, $request) {
            // Buscar o crear el perfil del cliente por email
            $clientProfile = $this->resolveClientProfile(
                $validated['client_email'],
                $validated['client_name'],
                $validated['client_phone'],
                $validated['notes'] ?? null,
                $request->user()?->id
            );

            // Crear la cita
            Appointment::create([
                'client_profile_id' => $clientProfile->id,
                'barber_profile_id' => $validated['barber_profile_id'],
                'service_id' => $service->id,
                'start_time' => $startDateTime,
                'end_time' => $endDateTime,
                'status' => 'pending',
                'price_at_booking' => $service->price,
            ]);
        });

        return redirect()->route('booking.success')
            ->with('success', 'Cita reservada correctamente. El barbero revisará tu solicitud pronto.');
    }

    // --- ALGORITMOS PRIVADOS ---

    private function calculateAvailableSlots(string $date, int $serviceId, int $barberId): array
    {
        $service = Service::find($serviceId);
        // Usamos duration_minutes de la tabla services. Fallback a 30 si no existe.
        $duration = ($service && isset($service->duration_minutes)) ? $service->duration_minutes : 30;

        // Horario comercial genérico (09:00 a 18:00)
        $workStart = Carbon::parse("{$date} 09:00:00");
        $workEnd = Carbon::parse("{$date} 18:00:00");

        // 1. OBTENER CITAS EXISTENTES (Adaptado a tus columnas DATETIME)
        // Buscamos citas que EMPIECEN en la fecha seleccionada ('start_time')
        // y que estén confirmadas o pendientes ('status').
        $existingAppointments = Appointment::where('barber_profile_id', $barberId)
            ->whereDate('start_time', $date) // Buscamos en la columna datetime 'start_time'
            ->whereIn('status', ['pending', 'confirmed']) // Usamos la columna 'status' real
            ->get();

        $availableSlots = [];
        $currentSlot = $workStart->copy();

        // 2. GENERAR BLOQUES DINÁMICAMENTE
        // El intervalo de generación es cada 30 min (independiente de la duración del servicio)
        while ($currentSlot->copy()->addMinutes($duration)->lte($workEnd)) {
            $slotStart = $currentSlot->copy();
            $slotEnd = $slotStart->copy()->addMinutes($duration);

            // Omitir si es hoy y la hora ya pasó
            if ($date === today()->toDateString() && $slotStart->isPast()) {
                $currentSlot->addMinutes(30);
                continue;
            }

            // 3. VERIFICAR SI EL BLOQUE ESTÁ OCUPADO (Comparación de Datetimes)
            $isOccupied = $existingAppointments->contains(function ($appointment) use ($slotStart, $slotEnd) {
                // Como start_time y end_time ya son DATETIME en la base de datos,
                // Carbon los parsea automáticamente.
                $appStart = Carbon::parse($appointment->start_time);
                $appEnd = Carbon::parse($appointment->end_time);

                // Lógica de solapamiento estándar
                return $slotStart->lt($appEnd) && $slotEnd->gt($appStart);
            });

            if (!$isOccupied) {
                // Guardamos solo la hora en formato H:i (ej: 09:30)
                $availableSlots[] = $slotStart->format('H:i');
            }

            // Avanzar el puntero para generar el siguiente slot
            $currentSlot->addMinutes(30);
        }

        return $availableSlots;
    }

    private function hasOverlap(int $barberId, Carbon $start, Carbon $end): bool
    {
        return Appointment::where('barber_profile_id', $barberId)
            ->whereIn('status', ['pending', 'confirmed'])
            ->where(function ($query) use ($start, $end) {
                $query->where('start_time', '<', $end)
                    ->where('end_time', '>', $start);
            })
            ->exists();
    }

    private function resolveClientProfile(string $email, string $name, string $phone, ?string $notes, ?int $userId): ClientProfile
    {
        // 1. Si el usuario está autenticado, buscamos o actualizamos su perfil asociado
        if ($userId) {
            return ClientProfile::updateOrCreate(
                ['user_id' => $userId],
                [
                    'full_name' => $name,
                    'phone' => $phone,
                    'notes' => $notes,
                ]
            );
        }

        // 2. Si es un invitado, gestionamos el perfil sin tocar la tabla `users`.
        // Puedes buscar por correo o teléfono dentro de la misma tabla `client_profiles` 
        // si necesitas evitar duplicados para invitados, o simplemente crearlo.
        return ClientProfile::updateOrCreate(
            ['phone' => $phone], // O el criterio que prefieras para identificar al cliente invitado
            [
                'user_id' => null,
                'full_name' => $name,
                'phone' => $phone,
                'notes' => $notes,
            ]
        );
    }
}