<?php

namespace App\Http\Controllers\Agenda;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AgendaListController extends Controller
{
    public function index(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();
        $barberProfile = $user->barberProfile()->first();

        if ($barberProfile === null) {
            return Inertia::render('agenda/list', [
                'appointments' => [],
                'pendingCount' => 0,
            ]);
        }

        $appointments = Appointment::where('barber_profile_id', $barberProfile->id)
            ->with(['service'])
            ->orderByDesc('start_time')
            ->get()
            ->map(function (Appointment $appointment): array {
                $status = $appointment->status;

                return [
                    'id' => $appointment->id,
                    'client' => $appointment->guest_name ?? $appointment->user->name ?? 'Cliente',
                    'email' => $appointment->user?->email,
                    'phone' => $appointment->guest_phone ?? $appointment->user?->phone,
                    'phoneFormatted' => $appointment->guest_phone ?? $appointment->user->phone ?? '',
                    'service' => $appointment->service->name ?? 'Servicio',
                    'duration' => $appointment->service?->duration_minutes,
                    'price' => $appointment->price_at_booking,
                    'start_time' => $appointment->start_time->format('d/m/Y'),
                    'time' => $appointment->start_time->format('H:i'),
                    'notes' => $appointment->notes,
                    'status' => $status,
                ];
            })
            ->values();

        $pendingCount = $appointments->where('status', 'pending')->count();

        return Inertia::render('agenda/list', [
            'appointments' => $appointments,
            'pendingCount' => $pendingCount,
        ]);
    }
}
