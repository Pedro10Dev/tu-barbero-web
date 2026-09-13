<?php

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