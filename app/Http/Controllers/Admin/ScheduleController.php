<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\BarberProfile;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ScheduleController extends Controller
{
    public function index(Request $request): Response
    {
        $date = CarbonImmutable::parse($request->query('date') ?? CarbonImmutable::today()->toDateString());

        $barbers = BarberProfile::query()
            ->orderBy('display_name')
            ->get()
            ->map(function (BarberProfile $barber) use ($date): array {
                $slots = Appointment::where('barber_profile_id', $barber->id)
                    ->whereIn('status', ['pending', 'confirmed'])
                    ->whereDate('start_time', $date->toDateString())
                    ->with('service')
                    ->orderBy('start_time')
                    ->get()
                    ->map(function (Appointment $appointment): array {
                        return [
                            'id' => $appointment->id,
                            'client' => $appointment->guest_name ?? $appointment->user->name ?? 'Cliente',
                            'service' => $appointment->service->name ?? 'Servicio',
                            'start_time' => $appointment->start_time->format('H:i'),
                            'end_time' => $appointment->end_time->format('H:i'),
                            'status' => $appointment->status,
                        ];
                    })
                    ->values();

                return [
                    'id' => $barber->id,
                    'display_name' => $barber->display_name,
                    'is_active' => (bool) $barber->is_active,
                    'slots' => $slots,
                ];
            })
            ->values();

        return Inertia::render('admin/schedules/index', [
            'date' => $date->toDateString(),
            'barbers' => $barbers,
        ]);
    }
}
