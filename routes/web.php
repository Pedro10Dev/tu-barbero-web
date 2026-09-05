<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\BookingController;
use App\Models\Service;
use Inertia\Inertia;
use App\Http\Middleware\RedirectClientsToLanding;
use App\Http\Controllers\ClientProfileController;
use App\Http\Controllers\Auth\SocialController;
use App\Http\Controllers\PhonePromptController;
use App\Http\Controllers\BarberDashboardController;


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

Route::middleware(['auth', 'verified', 'phone.required'])->group(function () {
    Route::get('/dashboard', function () {
        $user = Auth::user();

        // Si tu Enum es un backed enum (ej: string), evalúa su value o compara directo con el caso del Enum:
        if ($user && $user->role->value === 'client') { // O prueba con: $user->role === UserRole::Client
            return redirect()->route('landing');
        }

       return app(BarberDashboardController::class)->index(request());
    })->name('dashboard');
});

Route::get('/agenda/calendario', function () {
    return Inertia::render('agenda/calendar');
})->middleware(['auth', 'verified', 'phone.required'])->name('agenda.calendar');

Route::get('/agenda/listado', function () {
    return Inertia::render('agenda/list');
})->middleware(['auth', 'verified', 'phone.required'])->name('agenda.list');

Route::get('/clientes', function () {
    return Inertia::render('client/index');
})->middleware(['auth', 'verified', 'phone.required'])->name('clients.index');

Route::get('/servicios', function () {
    return Inertia::render('services/index');
})->middleware(['auth', 'verified', 'phone.required'])->name('services.index');

Route::get('/productividad', function () {
    return Inertia::render('productividad/index');
})->middleware(['auth', 'verified', 'phone.required'])->name('productividad.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/client/profile', [ClientProfileController::class, 'edit'])->name('client.profile.edit');
    Route::patch('/client/profile', [ClientProfileController::class, 'update'])->name('client.profile.update');
});

Route::get('/auth/google', [SocialController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [SocialController::class, 'handleGoogleCallback']);



require __DIR__ . '/settings.php';
