<?php

use App\Models\Setting;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->admin = User::factory()->create(['phone' => '6001234']);
    $this->admin->assignRole('admin');
});

test('admins can see the business ficha settings', function () {
    $this->actingAs($this->admin)
        ->get(route('admin.settings.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/settings/index')
            ->has('business', fn (Assert $business) => $business
                ->has('business_name')
                ->has('business_phone')
                ->has('business_whatsapp')
                ->has('business_address')
                ->has('business_hours')
            )
        );
});

test('admins can save the business ficha settings', function () {
    $this->actingAs($this->admin)
        ->from(route('admin.settings.index'))
        ->patch(route('admin.settings.update'), [
            'business_name' => 'Barbería Central',
            'business_phone' => '0412-123-4567',
            'business_whatsapp' => '0412-123-4567',
            'business_address' => 'Av. Siempre Viva 742',
            'business_hours' => 'Lun-Sáb 9:00-19:00',
        ])
        ->assertRedirect(route('admin.settings.index'));

    expect(Setting::where('key', 'business_name')->value('value'))->toBe('Barbería Central')
        ->and(Setting::where('key', 'business_hours')->value('value'))->toBe('Lun-Sáb 9:00-19:00');
});

test('saving the business ficha requires a name', function () {
    $this->actingAs($this->admin)
        ->patch(route('admin.settings.update'), [
            'business_name' => '',
        ])
        ->assertSessionHasErrors('business_name');
});

test('only admins can access the settings module', function () {
    $barber = User::factory()->create(['phone' => '6001234']);
    $barber->assignRole('barber');

    $this->actingAs($barber)
        ->get(route('admin.settings.index'))
        ->assertForbidden();
});
