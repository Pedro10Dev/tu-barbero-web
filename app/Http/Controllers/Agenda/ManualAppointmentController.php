<?php

namespace App\Http\Controllers\Agenda;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Service;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ManualAppointmentController extends Controller
{
    public function create(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();

        return Inertia::render('agenda/create', [
            'services' => Service::query()
                ->orderBy('name')
                ->get()
                ->map(fn (Service $service): array => [
                    'id' => $service->id,
                    'name' => $service->name,
                    'duration_minutes' => $service->duration_minutes,
                    'price' => $service->price,
                ]),
            'barberProfileId' => $user->barberProfile()->value('id'),
            'authClient' => [
                'name' => $user->name,
                'phone' => $user->phone ?? '',
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required|date_format:H:i',
            'client_name' => 'required|string|max:255',
            'client_phone' => 'required|string|max:20',
            'notes' => 'nullable|string|max:500',
        ]);

        /** @var User $user */
        $user = $request->user();
        $barberProfile = $user->barberProfile()->first();

        if ($barberProfile === null) {
            abort(403);
        }

        $service = Service::query()->whereKey($validated['service_id'])->firstOrFail();
        $start = Carbon::parse($validated['date'].' '.$validated['time']);
        $end = $start->copy()->addMinutes($service->duration_minutes);

        $overlaps = Appointment::where('barber_profile_id', $barberProfile->id)
            ->where('status', 'confirmed')
            ->where(function ($query) use ($start, $end): void {
                $query->where('start_time', '<', $end)
                    ->where('end_time', '>', $start);
            })
            ->exists();

        if ($overlaps) {
            return back()->withErrors([
                'time' => 'El horario elegido ya está ocupado por otra cita. Elige otro.',
            ]);
        }

        Appointment::create([
            'user_id' => null,
            'guest_name' => $validated['client_name'],
            'guest_phone' => $validated['client_phone'],
            'barber_profile_id' => $barberProfile->id,
            'service_id' => $service->id,
            'start_time' => $start,
            'end_time' => $end,
            'status' => 'confirmed',
            'price_at_booking' => $service->price,
            'notes' => $validated['notes'] ?? null,
        ]);

        return redirect()->route('agenda.calendar')
            ->with('toast', ['type' => 'success', 'message' => 'Turno creado y confirmado en tu agenda.']);
    }
}
