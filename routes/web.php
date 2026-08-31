<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookingController;
use App\Models\Service;
use Inertia\Inertia;
use App\Http\Middleware\RedirectClientsToLanding;
use App\Http\Controllers\ClientProfileController;
use App\Http\Controllers\Auth\SocialController;


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
    Route::get('/dashboard', function () {
        $user = auth()->user();

        // Si tu Enum es un backed enum (ej: string), evalúa su value o compara directo con el caso del Enum:
        if ($user && $user->role->value === 'client') { // O prueba con: $user->role === UserRole::Client
            return redirect()->route('landing');
        }

        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/client/profile', [ClientProfileController::class, 'edit'])->name('client.profile.edit');
    Route::patch('/client/profile', [ClientProfileController::class, 'update'])->name('client.profile.update');
});

Route::get('/auth/google', [SocialController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [SocialController::class, 'handleGoogleCallback']);



require __DIR__ . '/settings.php';
