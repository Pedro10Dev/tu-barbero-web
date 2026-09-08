<?php

use App\Models\Appointment;
use App\Models\BarberProfile;
use App\Models\Service;
use App\Models\User;

function createAppointmentDecisionFixture(BarberProfile $profile, Service $service, string $start, string $end, ?User $user = null, string $status = 'pending'): Appointment
{
    return Appointment::create([
        'user_id' => $user?->id,
        'guest_name' => $user === null ? 'Cliente Temporal' : null,
        'guest_phone' => $user === null ? '61112233' : null,
        'barber_profile_id' => $profile->id,
        'service_id' => $service->id,
        'start_time' => $start,
        'end_time' => $end,
        'status' => $status,
        'price_at_booking' => $service->price,
    ]);
}

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

test('guests are redirected to the login page when deciding an appointment', function () {
    $appointment = createAppointmentDecisionFixture($this->barberProfile, $this->service, '2026-09-10 14:00:00', '2026-09-10 14:30:00');

    $this->patch(route('agenda.appointment.status', ['appointment' => $appointment->id]), [
        'action' => 'accept',
    ])->assertRedirect(route('login'));
});

test('barbers can visit the agenda pages', function () {
    $this->actingAs($this->barber);

    foreach (['agenda.calendar', 'agenda.list', 'services.index', 'clients.index', 'productividad.index'] as $name) {
        $this->get(route($name))->assertOk();
    }
});

test('clients cannot access the barber agenda', function () {
    $client = User::factory()->create(['phone' => '6005678']);
    $client->assignRole('client');

    $this->actingAs($client)->get(route('agenda.calendar'))->assertForbidden();
});

test('a barber can accept a pending appointment', function () {
    $appointment = createAppointmentDecisionFixture($this->barberProfile, $this->service, '2026-09-10 14:00:00', '2026-09-10 14:30:00');

    $this->actingAs($this->barber)
        ->from('/')
        ->patch(route('agenda.appointment.status', ['appointment' => $appointment->id]), [
            'action' => 'accept',
        ])
        ->assertSessionHasNoErrors()
        ->assertRedirect('/');

    expect($appointment->fresh()->status)->toBe('confirmed');
});

test('a barber can reject a pending appointment', function () {
    $appointment = createAppointmentDecisionFixture($this->barberProfile, $this->service, '2026-09-10 14:00:00', '2026-09-10 14:30:00');

    $this->actingAs($this->barber)
        ->from('/')
        ->patch(route('agenda.appointment.status', ['appointment' => $appointment->id]), [
            'action' => 'reject',
        ])
        ->assertSessionHasNoErrors()
        ->assertRedirect('/');

    expect($appointment->fresh()->status)->toBe('rejected');
});

test('accepting a pending appointment rejects overlapping pending appointments of the same barber', function () {
    $target = createAppointmentDecisionFixture($this->barberProfile, $this->service, '2026-09-10 14:00:00', '2026-09-10 14:30:00');
    $overlap = createAppointmentDecisionFixture($this->barberProfile, $this->service, '2026-09-10 14:15:00', '2026-09-10 14:45:00');
    $free = createAppointmentDecisionFixture($this->barberProfile, $this->service, '2026-09-10 15:00:00', '2026-09-10 15:30:00');

    $this->actingAs($this->barber)
        ->patch(route('agenda.appointment.status', ['appointment' => $target->id]), [
            'action' => 'accept',
        ])
        ->assertSessionHasNoErrors();

    expect($target->fresh()->status)->toBe('confirmed');
    expect($overlap->fresh()->status)->toBe('rejected');
    expect($free->fresh()->status)->toBe('pending');
});

test('accepting a pending appointment does not affect pending appointments of another barber', function () {
    $otherBarber = User::factory()->create(['phone' => '6009999']);
    $otherBarber->assignRole('barber');

    $otherProfile = BarberProfile::create([
        'user_id' => $otherBarber->id,
        'display_name' => 'Otro Barber',
        'is_active' => true,
    ]);

    $otherAppointment = createAppointmentDecisionFixture($otherProfile, $this->service, '2026-09-10 14:15:00', '2026-09-10 14:45:00');

    $target = createAppointmentDecisionFixture($this->barberProfile, $this->service, '2026-09-10 14:00:00', '2026-09-10 14:30:00');

    $this->actingAs($this->barber)
        ->patch(route('agenda.appointment.status', ['appointment' => $target->id]), [
            'action' => 'accept',
        ]);

    expect($target->fresh()->status)->toBe('confirmed');
    expect($otherAppointment->fresh()->status)->toBe('pending');
});

test('an already processed appointment cannot be decided again', function () {
    $confirmed = createAppointmentDecisionFixture($this->barberProfile, $this->service, '2026-09-10 14:00:00', '2026-09-10 14:30:00', null, 'confirmed');

    $this->actingAs($this->barber)
        ->from('/agenda/listado')
        ->patch(route('agenda.appointment.status', ['appointment' => $confirmed->id]), [
            'action' => 'accept',
        ])
        ->assertSessionHasErrors('action');

    expect($confirmed->fresh()->status)->toBe('confirmed');
});

test('a barber cannot decide an appointment of another barber', function () {
    $otherBarber = User::factory()->create(['phone' => '6009999']);
    $otherBarber->assignRole('barber');

    $otherProfile = BarberProfile::create([
        'user_id' => $otherBarber->id,
        'display_name' => 'Otro Barber',
        'is_active' => true,
    ]);

    $appointment = createAppointmentDecisionFixture($otherProfile, $this->service, '2026-09-10 14:00:00', '2026-09-10 14:30:00');

    $this->actingAs($this->barber)
        ->patch(route('agenda.appointment.status', ['appointment' => $appointment->id]), [
            'action' => 'accept',
        ])
        ->assertForbidden();

    expect($appointment->fresh()->status)->toBe('pending');
});

test('an invalid action is not accepted', function () {
    $appointment = createAppointmentDecisionFixture($this->barberProfile, $this->service, '2026-09-10 14:00:00', '2026-09-10 14:30:00');

    $this->actingAs($this->barber)
        ->from('/')
        ->patch(route('agenda.appointment.status', ['appointment' => $appointment->id]), [
            'action' => 'cancel',
        ])
        ->assertSessionHasErrors('action');

    expect($appointment->fresh()->status)->toBe('pending');
});
