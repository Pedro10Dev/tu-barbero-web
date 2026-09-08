<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Auth\SocialController;
use App\Http\Controllers\BarberDashboardController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ClientProfileController;
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
});

Route::middleware(['auth', 'verified', 'phone.required', RoleMiddleware::class.':barber|admin'])->group(function () {
    Route::get('/dashboard', [BarberDashboardController::class, 'index'])->name('dashboard');

    Route::get('/agenda/calendario', fn () => Inertia::render('agenda/calendar'))->name('agenda.calendar');
    Route::get('/agenda/listado', fn () => Inertia::render('agenda/list'))->name('agenda.list');
    Route::get('/clientes', fn () => Inertia::render('client/index'))->name('clients.index');
    Route::get('/servicios', fn () => Inertia::render('services/index'))->name('services.index');
    Route::get('/productividad', fn () => Inertia::render('productividad/index'))->name('productividad.index');
});

Route::middleware(['auth', RoleMiddleware::class.':admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/client/profile', [ClientProfileController::class, 'edit'])->name('client.profile.edit');
    Route::patch('/client/profile', [ClientProfileController::class, 'update'])->name('client.profile.update');
});

Route::get('/auth/google', [SocialController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [SocialController::class, 'handleGoogleCallback']);

require __DIR__.'/settings.php';
