<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\BarberProfile;
use App\Models\Service;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        Carbon::setLocale('es');

        $recentAppointments = Appointment::query()
            ->orderByDesc('start_time')
            ->limit(6)
            ->with(['barberProfile', 'service', 'user'])
            ->get()
            ->map(function (Appointment $appointment): array {
                return [
                    'id' => $appointment->id,
                    'client' => $appointment->guest_name ?? $appointment->user->name ?? 'Cliente',
                    'barber' => $appointment->barber_name ?? $appointment->barberProfile->display_name ?? '—',
                    'service' => $appointment->service->name ?? 'Servicio',
                    'start_time' => $appointment->start_time->format('d/m/Y H:i'),
                    'status' => $appointment->status,
                ];
            })
            ->values();

        $recentActivity = collect();

        foreach (Appointment::query()->orderByDesc('updated_at')->limit(6)->get() as $appointment) {
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
                default => 'emerald',
            };

            $recentActivity->push([
                'id' => 'appointment-'.$appointment->id,
                'title' => $label,
                'description' => ($appointment->guest_name ?? $appointment->user->name ?? 'Cliente')
                    .' · '.($appointment->barber_name ?? $appointment->barberProfile->display_name ?? '—')
                    .' · '.$appointment->updated_at->diffForHumans(),
                'tone' => $tone,
            ]);
        }

        foreach (User::query()->whereNotNull('email_verified_at')->orderByDesc('created_at')->limit(4)->get() as $user) {
            $recentActivity->push([
                'id' => 'user-'.$user->id,
                'title' => 'Nuevo usuario registrado',
                'description' => $user->name.' · '.$user->created_at->diffForHumans(),
                'tone' => 'blue',
            ]);
        }

        $recentActivity = $recentActivity->take(8)->values();

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalUsers' => User::count(),
                'totalAppointments' => Appointment::count(),
                'activeBarbers' => BarberProfile::count(),
                'appointmentsToday' => Appointment::whereIn('status', ['pending', 'confirmed'])
                    ->whereDate('start_time', Carbon::today())
                    ->count(),
                'totalServices' => Service::count(),
            ],
            'recentAppointments' => $recentAppointments,
            'recentActivity' => $recentActivity,
        ]);
    }
}
