<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use Inertia\Inertia;
use Carbon\Carbon;

class BarberDashboardController extends Controller
{
    public function index(Request $request)
    {
        $barberId = $request->user()->id;

        // 1. Cortes totales (filtrando por user_id y status completed)
        $totalCuts = Appointment::where('user_id', $barberId)
            ->where('status', 'completed')
            ->count();

        // 2. Cortes del mes actual (usando start_time para el mes y año)
        $monthlyCuts = Appointment::where('user_id', $barberId)
            ->where('status', 'completed')
            ->whereMonth('start_time', Carbon::now()->month)
            ->whereYear('start_time', Carbon::now()->year)
            ->count();

        // 3. Citas agendadas (activas)
        $scheduledAppointments = Appointment::where('user_id', $barberId)
            ->where('status', 'scheduled')
            ->count();

        // 4. Citas pendientes por aceptar o rechazar
        $pendingAppointments = Appointment::where('user_id', $barberId)
            ->where('status', 'pending')
            ->with('client')
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalCuts' => $totalCuts,
                'monthlyCuts' => $monthlyCuts,
                'scheduledAppointments' => $scheduledAppointments,
            ],
            'pendingAppointments' => $pendingAppointments,
        ]);
    }
}