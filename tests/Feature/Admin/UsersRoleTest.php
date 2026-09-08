<?php

use App\Models\BarberProfile;
use App\Models\User;

beforeEach(function () {
    $this->admin = User::factory()->create(['phone' => '6001234']);
    $this->admin->assignRole('admin');
});

test('admins can assign a role to another user', function () {
    $client = User::factory()->create(['phone' => '6005678']);
    $client->assignRole('client');

    $this->actingAs($this->admin)
        ->from(route('admin.users.index'))
        ->patch(route('admin.users.role', ['user' => $client->id]), [
            'role' => 'barber',
        ])
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.users.index'));

    expect($client->fresh()->getRoleNames()->all())->toBe(['barber']);
});

test('promoting a user to barber without profile creates a basic profile', function () {
    $client = User::factory()->create(['phone' => '6005678']);
    $client->assignRole('client');

    $this->actingAs($this->admin)
        ->patch(route('admin.users.role', ['user' => $client->id]), [
            'role' => 'barber',
        ])
        ->assertSessionHasNoErrors();

    expect(BarberProfile::where('user_id', $client->id)->exists())->toBeTrue()
        ->and($client->barberProfile->display_name)->toBe($client->name);
});

test('admins cannot remove their own admin role', function () {
    $this->actingAs($this->admin)
        ->from(route('admin.users.index'))
        ->patch(route('admin.users.role', ['user' => $this->admin->id]), [
            'role' => 'client',
        ])
        ->assertSessionHasErrors('role');

    expect($this->admin->getRoleNames()->all())->toBe(['admin']);
});

test('an invalid role is not accepted', function () {
    $client = User::factory()->create(['phone' => '6005678']);
    $client->assignRole('client');

    $this->actingAs($this->admin)
        ->from(route('admin.users.index'))
        ->patch(route('admin.users.role', ['user' => $client->id]), [
            'role' => 'moderator',
        ])
        ->assertSessionHasErrors('role');

    expect($client->getRoleNames()->all())->toBe(['client']);
});

test('guests cannot change user roles', function () {
    $client = User::factory()->create(['phone' => '6005678']);
    $client->assignRole('client');

    $this->patch(route('admin.users.role', ['user' => $client->id]), [
        'role' => 'barber',
    ])->assertRedirect(route('login'));
});
