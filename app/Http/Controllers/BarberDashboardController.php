<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BarberDashboardController extends Controller
{
    public function index(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();

        $barberProfile = $user->barberProfile()->first();

        if ($barberProfile === null) {
            return Inertia::render('dashboard', [
                'stats' => [
                    'totalCuts' => 0,
                    'monthlyCuts' => 0,
                    'monthlyRevenue' => 0,
                    'todayAppointments' => 0,
                    'scheduledAppointments' => 0,
                ],
                'pendingAppointments' => [],
                'nextAppointment' => null,
            ]);
        }

        $barberId = $barberProfile->id;
        $startOfMonth = Carbon::now()->startOfMonth();

        $totalCuts = Appointment::where('barber_profile_id', $barberId)
            ->where('status', 'completed')
            ->count();

        $monthlyCuts = Appointment::where('barber_profile_id', $barberId)
            ->where('status', 'completed')
            ->where('start_time', '>=', $startOfMonth)
            ->count();

        $monthlyRevenue = (float) Appointment::where('barber_profile_id', $barberId)
            ->where('status', 'completed')
            ->where('start_time', '>=', $startOfMonth)
            ->sum('price_at_booking');

        $todayAppointments = Appointment::where('barber_profile_id', $barberId)
            ->whereIn('status', ['pending', 'scheduled', 'confirmed'])
            ->whereDate('start_time', Carbon::today())
            ->count();

        $scheduledAppointments = Appointment::where('barber_profile_id', $barberId)
            ->whereIn('status', ['scheduled', 'confirmed'])
            ->count();

        $pendingAppointments = Appointment::where('barber_profile_id', $barberId)
            ->where('status', 'pending')
            ->with(['user', 'service'])
            ->orderBy('start_time')
            ->get()
            ->map(function (Appointment $appointment): array {
                return [
                    'id' => $appointment->id,
                    'client' => $appointment->guest_name ?? $appointment->user?->name,
                    'start_time' => $appointment->start_time->format('d/m/Y H:i'),
                    'service' => $appointment->service?->name,
                ];
            })
            ->values();

        $nextAppointment = Appointment::where('barber_profile_id', $barberId)
            ->whereIn('status', ['scheduled', 'confirmed'])
            ->where('start_time', '>=', Carbon::now())
            ->with(['user', 'service'])
            ->orderBy('start_time')
            ->first();

        $nextAppointmentData = $nextAppointment !== null ? [
            'client' => $nextAppointment->guest_name ?? $nextAppointment->user?->name,
            'start_time' => $nextAppointment->start_time->format('d/m/Y H:i'),
            'service' => $nextAppointment->service?->name,
        ] : null;

        return Inertia::render('dashboard', [
            'stats' => [
                'totalCuts' => $totalCuts,
                'monthlyCuts' => $monthlyCuts,
                'monthlyRevenue' => $monthlyRevenue,
                'todayAppointments' => $todayAppointments,
                'scheduledAppointments' => $scheduledAppointments,
            ],
            'pendingAppointments' => $pendingAppointments,
            'nextAppointment' => $nextAppointmentData,
        ]);
    }
}
