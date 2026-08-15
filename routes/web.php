<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookingController;
use App\Models\Service;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('landing', [
        'services' => Service::all(),
    ]);
});


Route::get('/booking', [BookingController::class, 'index'])->name('booking');
Route::get('/api/booking/availability', [BookingController::class, 'availability'])->name('booking.availability');
Route::post('/booking', [BookingController::class, 'store'])->name('booking.store');


Route::get('/reserva-exitosa', function () {
    return inertia('booking/success');
})->name('booking.success');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__ . '/settings.php';
