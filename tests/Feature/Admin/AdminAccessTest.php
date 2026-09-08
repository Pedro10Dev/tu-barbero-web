<?php

use App\Models\User;

beforeEach(function () {
    $this->admin = User::factory()->create(['phone' => '6001234']);
    $this->admin->assignRole('admin');
});

test('guests are redirected to the login page when visiting the admin zone', function () {
    $this->get(route('admin.dashboard'))->assertRedirect(route('login'));
});

test('admins can visit all admin pages', function () {
    $this->actingAs($this->admin);

    $pages = [
        'admin.dashboard',
        'admin.appointments.index',
        'admin.barbers.index',
        'admin.barbers.create',
        'admin.services.index',
        'admin.services.create',
        'admin.users.index',
        'admin.schedules.index',
        'admin.settings.index',
    ];

    foreach ($pages as $route) {
        $this->get(route($route))->assertOk();
    }
});

test('the audit and role pages no longer exist', function () {
    $this->actingAs($this->admin);

    $this->get('/admin/activity')->assertNotFound();
    $this->get('/admin/roles')->assertNotFound();
});

test('barbers cannot access the admin zone', function () {
    $barber = User::factory()->create(['phone' => '6001234']);
    $barber->assignRole('barber');

    $this->actingAs($barber)
        ->get(route('admin.dashboard'))
        ->assertForbidden();
});

test('clients cannot access the admin zone', function () {
    $client = User::factory()->create(['phone' => '6001234']);
    $client->assignRole('client');

    $this->actingAs($client)
        ->get(route('admin.dashboard'))
        ->assertForbidden();
});
