<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\BarberProfile;
use App\Models\User;
use Carbon\Carbon;
use App\Models\Appointment;
use App\Models\Service;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalUsers' => User::count(),
                'totalAppointments' => Appointment::count() ?? 0,
                'activeBarbers' => BarberProfile::count() ?? 0,
                'appointmentsToday' => Appointment::whereDate('created_at', Carbon::today())->count() ?? 0,
                'totalServices' => Service::count() ?? 0,
            
            ]
        ]);
    }
}