<?php

namespace App\Http\Controllers\Agenda;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AgendaCalendarController extends Controller
{
    public function index(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();
        $barberProfile = $user->barberProfile()->first();

        $view = in_array($request->query('view'), ['day', 'week', 'month'], true)
            ? $request->query('view')
            : 'day';

        $date = CarbonImmutable::parse($request->query('date') ?? CarbonImmutable::today()->toDateString());

        if ($barberProfile === null) {
            return Inertia::render('agenda/calendar', [
                'date' => $date->toDateString(),
                'view' => $view,
                'appointments' => [],
            ]);
        }

        [$start, $end] = match ($view) {
            'week' => [$date->startOfWeek(), $date->endOfWeek()],
            'month' => [$date->startOfMonth(), $date->endOfMonth()],
            default => [$date->startOfDay(), $date->endOfDay()],
        };

        $appointments = Appointment::where('barber_profile_id', $barberProfile->id)
            ->whereIn('status', ['pending', 'confirmed'])
            ->where('start_time', '>=', $start)
            ->where('start_time', '<=', $end)
            ->with('service')
            ->orderBy('start_time')
            ->get()
            ->map(function (Appointment $appointment): array {
                return [
                    'id' => $appointment->id,
                    'date' => $appointment->start_time->toDateString(),
                    'client' => $appointment->guest_name ?? $appointment->user->name ?? 'Cliente',
                    'service' => $appointment->service->name ?? 'Servicio',
                    'start_time' => $appointment->start_time->format('H:i'),
                    'end_time' => $appointment->end_time->format('H:i'),
                    'status' => $appointment->status,
                ];
            })
            ->values();

        return Inertia::render('agenda/calendar', [
            'date' => $date->toDateString(),
            'view' => $view,
            'appointments' => $appointments,
        ]);
    }
}
