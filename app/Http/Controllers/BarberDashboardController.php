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
        Carbon::setLocale('es');

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
                'activity' => [],
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
            ->whereIn('status', ['pending', 'confirmed'])
            ->whereDate('start_time', Carbon::today())
            ->count();

        $scheduledAppointments = Appointment::where('barber_profile_id', $barberId)
            ->where('status', 'confirmed')
            ->count();

        $pendingAppointments = Appointment::where('barber_profile_id', $barberId)
            ->where('status', 'pending')
            ->with(['user', 'service'])
            ->orderBy('start_time')
            ->get()
            ->map(function (Appointment $appointment): array {
                return [
                    'id' => $appointment->id,
                    'client' => $appointment->guest_name ?? $appointment->user->name ?? 'Cliente',
                    'start_time' => $appointment->start_time->format('d/m/Y H:i'),
                    'service' => $appointment->service->name ?? 'Servicio',
                ];
            })
            ->values();

        $nextAppointment = Appointment::where('barber_profile_id', $barberId)
            ->where('status', 'confirmed')
            ->where('start_time', '>=', Carbon::now())
            ->with(['user', 'service'])
            ->orderBy('start_time')
            ->first();

        $nextAppointmentData = $nextAppointment !== null ? [
            'client' => $nextAppointment->guest_name ?? $nextAppointment->user->name ?? 'Cliente',
            'start_time' => $nextAppointment->start_time->format('d/m/Y H:i'),
            'service' => $nextAppointment->service->name ?? 'Servicio',
        ] : null;

        $activity = Appointment::where('barber_profile_id', $barberId)
            ->orderByDesc('start_time')
            ->limit(8)
            ->with('user')
            ->get()
            ->map(function (Appointment $appointment): array {
                $label = match ($appointment->status) {
                    'pending' => 'Nueva reserva',
                    'confirmed' => 'Cita confirmada',
                    'rejected' => 'Cita rechazada',
                    'cancelled' => 'Cita cancelada',
                    'completed' => 'Corte finalizado',
                    default => 'Cita actualizada',
                };

                $tone = match ($appointment->status) {
                    'cancelled', 'rejected' => 'rose',
                    'confirmed' => 'blue',
                    'completed' => 'emerald',
                    default => 'emerald',
                };

                return [
                    'id' => $appointment->id,
                    'title' => $label,
                    'description' => ($appointment->guest_name ?? $appointment->user->name ?? 'Cliente')
                                        .' · '.$appointment->start_time->diffForHumans(),
                    'tone' => $tone,
                ];
            })
            ->values();

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
            'activity' => $activity,
        ]);
    }
}
