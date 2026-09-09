<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AppointmentController;
use App\Http\Controllers\Admin\BarberController;
use App\Http\Controllers\Admin\ScheduleController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Agenda\AgendaCalendarController;
use App\Http\Controllers\Agenda\AgendaListController;
use App\Http\Controllers\Agenda\AppointmentStatusController;
use App\Http\Controllers\Agenda\ClientListController;
use App\Http\Controllers\Agenda\ManualAppointmentController;
use App\Http\Controllers\Agenda\ProductividadController;
use App\Http\Controllers\Agenda\ServiceListController;
use App\Http\Controllers\Auth\SocialController;
use App\Http\Controllers\BarberDashboardController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ClientProfileController;
use App\Http\Controllers\ForcedPasswordController;
use App\Http\Controllers\PhonePromptController;
use App\Models\Service;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\Permission\Middleware\RoleMiddleware;

Route::get('/', function () {
    return Inertia::render('landing', [
        'services' => Service::all(),
    ]);
})->name('landing');

Route::get('/booking', [BookingController::class, 'index'])->name('booking');
Route::get('/api/booking/availability', [BookingController::class, 'availability'])->name('booking.availability');
Route::post('/booking', [BookingController::class, 'store'])->name('booking.store');

Route::get('/reserva-exitosa', function () {
    return inertia('booking/success');
})->name('booking.success');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/complete-profile/phone', [PhonePromptController::class, 'create'])->name('phone.prompt');
    Route::post('/complete-profile/phone', [PhonePromptController::class, 'store'])->name('phone.store');

    Route::get('/complete-profile/password', [ForcedPasswordController::class, 'create'])
        ->middleware('password.change.required')
        ->name('password.force');
});

Route::middleware(['auth', 'verified', 'phone.required', 'password.change', RoleMiddleware::class.':barber|admin'])->group(function () {
    Route::get('/dashboard', [BarberDashboardController::class, 'index'])->name('dashboard');

    Route::get('/agenda/calendario', [AgendaCalendarController::class, 'index'])->name('agenda.calendar');
    Route::get('/agenda/listado', [AgendaListController::class, 'index'])->name('agenda.list');
    Route::patch('/agenda/appointments/{appointment}', [AppointmentStatusController::class, 'update'])->name('agenda.appointment.status');
    Route::get('/agenda/nuevo-turno', [ManualAppointmentController::class, 'create'])->name('agenda.appointments.create');
    Route::post('/agenda/appointments', [ManualAppointmentController::class, 'store'])->name('agenda.appointments.store');
    Route::get('/clientes', [ClientListController::class, 'index'])->name('clients.index');
    Route::get('/servicios', [ServiceListController::class, 'index'])->name('services.index');
    Route::get('/productividad', [ProductividadController::class, 'index'])->name('productividad.index');
});

Route::middleware(['auth', RoleMiddleware::class.':admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::get('/appointments', [AppointmentController::class, 'index'])->name('appointments.index');
    Route::resource('barbers', BarberController::class)->except(['show']);
    Route::resource('services', AdminServiceController::class)->except(['show']);
    Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
    Route::patch('/users/{user}/role', [AdminUserController::class, 'updateRole'])->name('users.role');
    Route::get('/schedules', [ScheduleController::class, 'index'])->name('schedules.index');
    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::patch('/settings', [SettingController::class, 'update'])->name('settings.update');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/client/profile', [ClientProfileController::class, 'edit'])->name('client.profile.edit');
    Route::patch('/client/profile', [ClientProfileController::class, 'update'])->name('client.profile.update');
});

Route::get('/auth/google', [SocialController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [SocialController::class, 'handleGoogleCallback']);

require __DIR__.'/settings.php';
