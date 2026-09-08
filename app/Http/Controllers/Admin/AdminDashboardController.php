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
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalUsers' => User::count(),
                'totalAppointments' => Appointment::count(),
                'activeBarbers' => BarberProfile::count(),
                'appointmentsToday' => Appointment::whereDate('created_at', Carbon::today())->count(),
                'totalServices' => Service::count(),
            ],
        ]);
    }
}
