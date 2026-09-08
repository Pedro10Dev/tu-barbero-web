<?php

use App\Models\Appointment;
use App\Models\BarberProfile;
use App\Models\Service;
use App\Models\User;
use Illuminate\Support\Facades\Notification;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->admin = User::factory()->create(['phone' => '6001234']);
    $this->admin->assignRole('admin');

    $this->barber = User::factory()->create(['phone' => '6005678']);
    $this->barber->assignRole('barber');

    $this->profile = BarberProfile::create([
        'user_id' => $this->barber->id,
        'display_name' => 'Barber Test',
        'is_active' => true,
    ]);

    $this->service = Service::create([
        'name' => 'Corte Clásico',
        'duration_minutes' => 30,
        'price' => 15.00,
    ]);
});

test('admins can see the listed barbers', function () {
    $this->actingAs($this->admin)
        ->get(route('admin.barbers.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/barbers/index')
            ->has('barbers', fn (Assert $barbers) => $barbers
                ->has(1)
                ->first(fn (Assert $first) => $first
                    ->has('id')
                    ->has('display_name')
                    ->has('bio')
                    ->has('is_active')
                    ->has('email')
                    ->has('phone')
                    ->has('appointmentCount')
                    ->has('monthlyCompleted')
                )
            )
        );
});

test('admins can create a barber with a user and barber profile', function () {
    Notification::fake();

    $this->actingAs($this->admin)
        ->from(route('admin.barbers.index'))
        ->post(route('admin.barbers.store'), [
            'name' => 'Nuevo Barber',
            'email' => 'nuevo@example.com',
            'phone_prefix' => '0412',
            'phone_number' => '1234567',
            'display_name' => 'Nuevo Barber',
            'bio' => 'Especialista en degradados',
            'is_active' => true,
            'password' => 'Secret-Password-123',
            'password_confirmation' => 'Secret-Password-123',
        ])
        ->assertRedirect(route('admin.barbers.index'));

    $user = User::where('email', 'nuevo@example.com')->firstOrFail();

    expect($user->hasRole('barber'))->toBeTruthy()
        ->and($user->phone)->toBe('04121234567')
        ->and($user->email_verified_at)->toBeNull()
        ->and($user->must_change_password)->toBeTrue();

    $profile = $user->barberProfile;

    expect($profile)->not->toBeNull()
        ->and($profile->display_name)->toBe('Nuevo Barber')
        ->and($profile->bio)->toBe('Especialista en degradados')
        ->and($profile->is_active)->toBeTruthy();
});

test('admin barber creation validates the payload', function () {
    $this->actingAs($this->admin)
        ->post(route('admin.barbers.store'), [
            'name' => '',
            'email' => 'no-un-email',
            'phone_number' => '123',
            'password' => '123456789',
            'password_confirmation' => 'different',
        ])
        ->assertSessionHasErrors([
            'name',
            'email',
            'display_name',
            'phone_number',
            'password',
        ]);
});

test('admins can update a barber and its linked user', function () {
    $this->actingAs($this->admin)
        ->from(route('admin.barbers.edit', ['barber' => $this->profile->id]))
        ->put(route('admin.barbers.update', ['barber' => $this->profile->id]), [
            'name' => 'Barber Renombrado',
            'email' => 'renombrado@example.com',
            'phone' => '6001111',
            'display_name' => 'Barber Renombrado',
            'bio' => null,
            'is_active' => false,
        ])
        ->assertRedirect(route('admin.barbers.index'));

    expect($this->profile->fresh()->display_name)->toBe('Barber Renombrado')
        ->and($this->profile->fresh()->is_active)->toBeFalsy()
        ->and($this->barber->fresh()->email)->toBe('renombrado@example.com');
});

test('admins can delete a barber without appointments', function () {
    $this->actingAs($this->admin)
        ->from(route('admin.barbers.index'))
        ->delete(route('admin.barbers.destroy', ['barber' => $this->profile->id]))
        ->assertRedirect(route('admin.barbers.index'));

    expect(BarberProfile::count())->toBe(0);
});

test('admins cannot delete a barber that has appointments', function () {
    Appointment::create([
        'user_id' => $this->barber->id,
        'guest_name' => null,
        'guest_phone' => null,
        'barber_profile_id' => $this->profile->id,
        'service_id' => $this->service->id,
        'start_time' => '2026-09-10 14:00:00',
        'end_time' => '2026-09-10 14:30:00',
        'status' => 'pending',
        'price_at_booking' => $this->service->price,
    ]);

    $this->actingAs($this->admin)
        ->from(route('admin.barbers.index'))
        ->delete(route('admin.barbers.destroy', ['barber' => $this->profile->id]))
        ->assertSessionHasErrors('barber');

    expect(BarberProfile::count())->toBe(1);
});
