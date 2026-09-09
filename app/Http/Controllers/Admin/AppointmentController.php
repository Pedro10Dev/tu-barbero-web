<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Inertia\Inertia;
use Inertia\Response;

class AppointmentController extends Controller
{
    public function index(): Response
    {
        $appointments = Appointment::query()
            ->orderByDesc('start_time')
            ->with(['barberProfile', 'service', 'user'])
            ->get()
            ->map(function (Appointment $appointment): array {
                return [
                    'id' => $appointment->id,
                    'client' => $appointment->guest_name ?? $appointment->user->name ?? 'Cliente',
                    'barber' => $appointment->barber_name ?? $appointment->barberProfile->display_name ?? '—',
                    'service' => $appointment->service->name ?? 'Servicio',
                    'start_time' => $appointment->start_time->format('d/m/Y'),
                    'time' => $appointment->start_time->format('H:i'),
                    'duration' => $appointment->service->duration_minutes ?? null,
                    'price' => $appointment->price_at_booking,
                    'status' => $appointment->status,
                    'notes' => $appointment->notes,
                ];
            })
            ->values();

        return Inertia::render('admin/appointments/index', [
            'appointments' => $appointments,
        ]);
    }
}
