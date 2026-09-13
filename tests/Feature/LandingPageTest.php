<?php

use App\Models\BarberProfile;
use App\Models\User;

test('landing renders the blade view', function () {
    $this->get('/')
        ->assertOk()
        ->assertViewIs('landing')
        ->assertSee('El Arte del');
});

test('landing hands off inertia requests with a full reload', function () {
    $this->withHeader('X-Inertia', 'true')
        ->get('/')
        ->assertStatus(409)
        ->assertHeader('X-Inertia-Location', url('/'));
});

test('landing shows active barbers with photo and social links', function () {
    $barber = User::factory()->create(['phone' => '6005678']);
    $barber->assignRole('barber');

    BarberProfile::create([
        'user_id' => $barber->id,
        'display_name' => 'Carlos Deportes',
        'bio' => 'Master Barber en degradados.',
        'is_active' => true,
        'social_links' => [
            ['platform' => 'instagram', 'url' => 'https://instagram.com/carlosdeportes'],
            ['platform' => 'whatsapp', 'url' => 'https://wa.me/584121234567'],
        ],
    ]);

    BarberProfile::create([
        'user_id' => $barber->id,
        'display_name' => 'Barbero Oculto',
        'bio' => 'No debe aparecer.',
        'is_active' => false,
    ]);

    $this->get('/')
        ->assertOk()
        ->assertSee('Carlos Deportes')
        ->assertSee('Master Barber en degradados.')
        ->assertSee('https://instagram.com/carlosdeportes')
        ->assertSee('https://wa.me/584121234567')
        ->assertSee('images/barber-placeholder.svg')
        ->assertDontSee('Barbero Oculto');
});

test('landing hides active barbers whose user has no barber role', function () {
    $sinRol = User::factory()->create(['phone' => '6000001']);

    BarberProfile::create([
        'user_id' => $sinRol->id,
        'display_name' => 'Sin Rol Barbero',
        'bio' => 'Perfil activo sin rol.',
        'is_active' => true,
        'social_links' => [
            ['platform' => 'facebook', 'url' => 'https://facebook.com/sinrol'],
        ],
    ]);

    $this->get('/')
        ->assertOk()
        ->assertDontSee('Sin Rol Barbero')
        ->assertDontSee('https://facebook.com/sinrol');
});