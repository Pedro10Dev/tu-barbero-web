<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\BarberProfile;
use App\Models\Service;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BookingController extends Controller
{
    // 1. Mostrar la página principal de reservas (Frontend React)
    public function index(Request $request)
    {
        $user = $request->user();

        return Inertia::render('booking/index', [
            'services' => Service::all(),
            'barbers' => BarberProfile::all(),
            'authClient' => $user ? [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone ?? '', // El teléfono ahora vive directamente en users
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

        $user = $request->user();

        DB::transaction(function () use ($validated, $service, $startDateTime, $endDateTime, $user) {
            // Crear la cita vinculando directamente al usuario (si existe) o guardando datos de invitado
            Appointment::create([
                'user_id' => $user ? $user->id : null,
                'guest_name' => $user ? $user->name : $validated['client_name'],
                'guest_phone' => $user ? $user->phone : $validated['client_phone'],
                'barber_profile_id' => $validated['barber_profile_id'],
                'service_id' => $service->id,
                'start_time' => $startDateTime,
                'end_time' => $endDateTime,
                'status' => 'pending',
                'price_at_booking' => $service->price,
                'notes' => $validated['notes'] ?? null, // Las notas van directamente en la cita
            ]);
        });

        return redirect()->route('booking.success')
            ->with('success', 'Cita reservada correctamente. El barbero revisará tu solicitud pronto.');
    }

    // --- ALGORITMOS PRIVADOS ---

    private function calculateAvailableSlots(string $date, int $serviceId, int $barberId): array
    {
        $service = Service::find($serviceId);
        $duration = ($service && isset($service->duration_minutes)) ? $service->duration_minutes : 30;

        $workStart = Carbon::parse("{$date} 09:00:00");
        $workEnd = Carbon::parse("{$date} 18:00:00");

        $existingAppointments = Appointment::where('barber_profile_id', $barberId)
            ->whereDate('start_time', $date)
            ->whereIn('status', ['pending', 'confirmed'])
            ->get();

        $availableSlots = [];
        $currentSlot = $workStart->copy();

        while ($currentSlot->copy()->addMinutes($duration)->lte($workEnd)) {
            $slotStart = $currentSlot->copy();
            $slotEnd = $slotStart->copy()->addMinutes($duration);

            if ($date === today()->toDateString() && $slotStart->isPast()) {
                $currentSlot->addMinutes(30);
                continue;
            }

            $isOccupied = $existingAppointments->contains(function ($appointment) use ($slotStart, $slotEnd) {
                $appStart = Carbon::parse($appointment->start_time);
                $appEnd = Carbon::parse($appointment->end_time);

                return $slotStart->lt($appEnd) && $slotEnd->gt($appStart);
            });

            if (!$isOccupied) {
                $availableSlots[] = $slotStart->format('H:i');
            }

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
}