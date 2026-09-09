<?php

use App\Models\Appointment;
use App\Models\BarberProfile;
use App\Models\Service;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->service = Service::create([
        'name' => 'Corte Clásico',
        'duration_minutes' => 30,
        'price' => 15.00,
    ]);

    $this->barber = User::factory()->create(['phone' => '6001234']);
    $this->barber->assignRole('barber');

    $this->barberProfile = BarberProfile::create([
        'user_id' => $this->barber->id,
        'display_name' => 'Barber Test',
        'is_active' => true,
    ]);
});

test('guests are redirected to the login page', function () {
    $this->get(route('agenda.appointments.create'))->assertRedirect(route('login'));
});

test('barbers can open the manual appointment form', function () {
    $this->actingAs($this->barber)
        ->get(route('agenda.appointments.create'))
        ->assertOk()
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('agenda/create')
                ->where('barberProfileId', $this->barberProfile->id)
                ->has('services', 1)
        );
});

test('barbers can create a confirmed manual appointment', function () {
    $this->actingAs($this->barber)
        ->from(route('agenda.appointments.create'))
        ->post(route('agenda.appointments.store'), [
            'service_id' => $this->service->id,
            'date' => '2026-09-20',
            'time' => '15:00',
            'client_name' => 'Cliente Directo',
            'client_phone' => '04121234567',
            'notes' => 'Cortesía degradado',
        ])
        ->assertRedirect(route('agenda.calendar'))
        ->assertSessionHasNoErrors();

    $appointment = Appointment::first();

    expect($appointment)->not->toBeNull()
        ->and($appointment->status)->toBe('confirmed')
        ->and($appointment->guest_name)->toBe('Cliente Directo')
        ->and($appointment->guest_phone)->toBe('04121234567')
        ->and($appointment->barber_profile_id)->toBe($this->barberProfile->id)
        ->and($appointment->price_at_booking)->toBe(15)
        ->and($appointment->notes)->toBe('Cortesía degradado');
});

test('a manual appointment cannot overlap a confirmed one of the same barber', function () {
    Appointment::create([
        'user_id' => null,
        'guest_name' => 'Cliente Existente',
        'guest_phone' => '6001111',
        'barber_profile_id' => $this->barberProfile->id,
        'service_id' => $this->service->id,
        'start_time' => '2026-09-20 15:00:00',
        'end_time' => '2026-09-20 15:30:00',
        'status' => 'confirmed',
        'price_at_booking' => $this->service->price,
    ]);

    $this->actingAs($this->barber)
        ->from(route('agenda.appointments.create'))
        ->post(route('agenda.appointments.store'), [
            'service_id' => $this->service->id,
            'date' => '2026-09-20',
            'time' => '15:15',
            'client_name' => 'Cliente Nuevo',
            'client_phone' => '04121234567',
        ])
        ->assertSessionHasErrors('time');

    expect(Appointment::count())->toBe(1);
});

test('manual appointment creation validates the payload', function () {
    $this->actingAs($this->barber)
        ->post(route('agenda.appointments.store'), [
            'date' => '2020-01-01',
        ])
        ->assertSessionHasErrors([
            'service_id',
            'date',
            'time',
            'client_name',
            'client_phone',
        ]);
});
