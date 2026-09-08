<?php

use App\Models\Appointment;
use App\Models\BarberProfile;
use App\Models\Service;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->admin = User::factory()->create(['phone' => '6001234']);
    $this->admin->assignRole('admin');

    $this->service = Service::create([
        'name' => 'Corte Clásico',
        'duration_minutes' => 30,
        'price' => 15.00,
    ]);
});

test('admins can see the listed services', function () {
    $this->actingAs($this->admin)
        ->get(route('admin.services.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/services/index')
            ->has('services', fn (Assert $services) => $services
                ->has(1)
                ->first(fn (Assert $first) => $first
                    ->has('id')
                    ->has('name')
                    ->has('duration_minutes')
                    ->has('price')
                    ->has('appointmentCount')
                )
            )
        );
});

test('admins can create a service', function () {
    $this->actingAs($this->admin)
        ->from(route('admin.services.index'))
        ->post(route('admin.services.store'), [
            'name' => 'Degradado + Barba',
            'duration_minutes' => 45,
            'price' => 20.00,
        ])
        ->assertRedirect(route('admin.services.index'));

    expect(Service::where('name', 'Degradado + Barba')->exists())->toBeTrue();
});

test('admin service creation validates the payload', function () {
    $this->actingAs($this->admin)
        ->post(route('admin.services.store'), [
            'name' => '',
            'duration_minutes' => 1,
            'price' => -5,
        ])
        ->assertSessionHasErrors(['name', 'duration_minutes', 'price']);
});

test('admins can update a service', function () {
    $this->actingAs($this->admin)
        ->from(route('admin.services.edit', ['service' => $this->service->id]))
        ->put(route('admin.services.update', ['service' => $this->service->id]), [
            'name' => 'Corte Premium',
            'duration_minutes' => 40,
            'price' => 25.00,
        ])
        ->assertRedirect(route('admin.services.index'));

    expect($this->service->fresh()->name)->toBe('Corte Premium')
        ->and($this->service->fresh()->duration_minutes)->toBe(40)
        ->and((float) $this->service->fresh()->price)->toBe(25.0);
});

test('admins can delete a service without appointments', function () {
    $this->actingAs($this->admin)
        ->from(route('admin.services.index'))
        ->delete(route('admin.services.destroy', ['service' => $this->service->id]))
        ->assertRedirect(route('admin.services.index'));

    expect(Service::count())->toBe(0);
});

test('admins cannot delete a service that has appointments', function () {
    $barber = User::factory()->create(['phone' => '6005678']);
    $barber->assignRole('barber');

    $profile = BarberProfile::create([
        'user_id' => $barber->id,
        'display_name' => 'Barber Test',
        'is_active' => true,
    ]);

    Appointment::create([
        'user_id' => $barber->id,
        'guest_name' => null,
        'guest_phone' => null,
        'barber_profile_id' => $profile->id,
        'service_id' => $this->service->id,
        'start_time' => '2026-09-10 14:00:00',
        'end_time' => '2026-09-10 14:30:00',
        'status' => 'pending',
        'price_at_booking' => $this->service->price,
    ]);

    $this->actingAs($this->admin)
        ->from(route('admin.services.index'))
        ->delete(route('admin.services.destroy', ['service' => $this->service->id]))
        ->assertSessionHasErrors('service');

    expect(Service::count())->toBe(1);
});
