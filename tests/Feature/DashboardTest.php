<?php

use App\Models\BarberProfile;
use App\Models\User;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated barbers can visit the dashboard', function () {
    $user = User::factory()->create(['phone' => '6001234']);

    $user->assignRole('barber');

    BarberProfile::create([
        'user_id' => $user->id,
        'display_name' => 'Test Barber',
        'is_active' => true,
    ]);

    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});

test('clients without barber role cannot visit the dashboard', function () {
    $user = User::factory()->create(['phone' => '6001234']);

    $user->assignRole('client');

    $this->actingAs($user);

    $this->get(route('dashboard'))->assertForbidden();
});
