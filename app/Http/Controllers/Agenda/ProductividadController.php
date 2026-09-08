<?php

namespace App\Http\Controllers\Agenda;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductividadController extends Controller
{
    public function index(Request $request): Response
    {
        Carbon::setLocale('es');

        /** @var User $user */
        $user = $request->user();
        $barberProfile = $user->barberProfile()->first();

        if ($barberProfile === null) {
            return Inertia::render('productividad/index', [
                'summary' => $this->emptySummary(),
                'recentActivity' => [],
            ]);
        }

        $baseQuery = Appointment::where('barber_profile_id', $barberProfile->id)
            ->where('status', 'completed')
            ->with('service');

        $today = CarbonImmutable::today();

        $periods = [
            'dia' => [$today->startOfDay(), $today->endOfDay()],
            'semana' => [$today->startOfWeek(), $today->endOfWeek()],
            'mes' => [$today->startOfMonth(), $today->endOfMonth()],
        ];

        $recentActivity = (clone $baseQuery)
            ->orderByDesc('start_time')
            ->limit(5)
            ->get()
            ->map(function (Appointment $appointment): array {
                return [
                    'id' => $appointment->id,
                    'client' => $appointment->guest_name ?? $appointment->user->name ?? 'Cliente',
                    'service' => $appointment->service->name ?? 'Servicio',
                    'time' => $appointment->start_time->diffForHumans(),
                    'duration' => $appointment->service?->duration_minutes,
                    'status' => 'Completado',
                ];
            });

        $summary = [];
        foreach ($periods as $key => [$start, $end]) {
            $appointments = (clone $baseQuery)
                ->where('start_time', '>=', $start)
                ->where('start_time', '<=', $end)
                ->get();

            $total = $appointments->count();
            $avgMinutes = $total > 0
                ? (int) round($appointments->avg(fn (Appointment $a) => $a->service->duration_minutes ?? 0))
                : 0;
            $topService = $appointments
                ->groupBy('service_id')
                ->sortByDesc(fn ($group) => $group->count())
                ->first()
                ?->first()
                ?->service
                ?->name;

            $summary[$key] = [
                'totalServicios' => $total,
                'tiempoPromedio' => $avgMinutes > 0 ? "{$avgMinutes} min" : '—',
                'servicioEstrella' => $topService ?? 'Sin actividad',
            ];
        }

        return Inertia::render('productividad/index', [
            'summary' => $summary,
            'recentActivity' => $recentActivity,
        ]);
    }

    /** @return array{dia: array{totalServicios: int, tiempoPromedio: string, servicioEstrella: string}, semana: array{totalServicios: int, tiempoPromedio: string, servicioEstrella: string}, mes: array{totalServicios: int, tiempoPromedio: string, servicioEstrella: string}} */
    private function emptySummary(): array
    {
        return [
            'dia' => ['totalServicios' => 0, 'tiempoPromedio' => '—', 'servicioEstrella' => 'Sin actividad'],
            'semana' => ['totalServicios' => 0, 'tiempoPromedio' => '—', 'servicioEstrella' => 'Sin actividad'],
            'mes' => ['totalServicios' => 0, 'tiempoPromedio' => '—', 'servicioEstrella' => 'Sin actividad'],
        ];
    }
}
