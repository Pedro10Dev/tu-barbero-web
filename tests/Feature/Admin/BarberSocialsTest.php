<?php

use App\Models\BarberProfile;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->admin = User::factory()->create(['phone' => '6001234']);
    $this->admin->assignRole('admin');

    Storage::fake('public');
});

test('admins can create a barber with photo and social links', function () {
    $payload = [
        'name' => 'Barber Social',
        'email' => 'social@example.com',
        'phone_prefix' => '0412',
        'phone_number' => '1234567',
        'display_name' => 'Barber Social',
        'bio' => 'Especialista en tendencias',
        'is_active' => true,
        'photo' => UploadedFile::fake()->image('avatar.jpg', 400, 500),
        'social_links' => [
            ['platform' => 'instagram', 'url' => 'https://instagram.com/tubarber'],
            ['platform' => 'tiktok', 'url' => 'https://tiktok.com/@tubarber'],
        ],
        'password' => 'Secret-Password-123',
        'password_confirmation' => 'Secret-Password-123',
    ];

    $this->actingAs($this->admin)
        ->from(route('admin.barbers.index'))
        ->post(route('admin.barbers.store'), $payload)
        ->assertRedirect(route('admin.barbers.index'));

    $profile = BarberProfile::where('display_name', 'Barber Social')->firstOrFail();

    expect($profile->photo_path)->not->toBeNull()
        ->and($profile->photo_path)->toStartWith('barbers/')
        ->and($profile->social_links)->toBe([
            ['platform' => 'instagram', 'url' => 'https://instagram.com/tubarber'],
            ['platform' => 'tiktok', 'url' => 'https://tiktok.com/@tubarber'],
        ])
        ->and(Storage::disk('public')->files('barbers'))->toHaveCount(1);

    $this->assertTrue($profile->photo_url !== '');
});

test('photo and social links are optional when creating a barber', function () {
    $payload = [
        'name' => 'Barber Simple',
        'email' => 'simple@example.com',
        'phone_prefix' => '0424',
        'phone_number' => '7654321',
        'display_name' => 'Barber Simple',
        'is_active' => true,
        'password' => 'Secret-Password-123',
        'password_confirmation' => 'Secret-Password-123',
    ];

    $this->actingAs($this->admin)
        ->post(route('admin.barbers.store'), $payload)
        ->assertRedirect(route('admin.barbers.index'));

    $profile = BarberProfile::where('display_name', 'Barber Simple')->firstOrFail();

    expect($profile->photo_path)->toBeNull()
        ->and($profile->social_links)->toBeNull();
});

test('admins can update a barber replacing the photo and removing the old one', function () {
    Storage::disk('public')->put('barbers/old-avatar.jpg', 'binary-fake-content');

    $barber = User::factory()->create(['phone' => '6005678']);
    $barber->assignRole('barber');

    $profile = BarberProfile::create([
        'user_id' => $barber->id,
        'display_name' => 'Barber Update',
        'bio' => null,
        'photo_path' => 'barbers/old-avatar.jpg',
        'social_links' => [
            ['platform' => 'facebook', 'url' => 'https://facebook.com/old'],
        ],
        'is_active' => true,
    ]);

    Storage::disk('public')->assertExists('barbers/old-avatar.jpg');

    $this->actingAs($this->admin)
        ->from(route('admin.barbers.edit', ['barber' => $profile->id]))
        ->put(route('admin.barbers.update', ['barber' => $profile->id]), [
            'name' => 'Barber Update',
            'email' => 'barber@example.com',
            'phone' => '6001111',
            'display_name' => 'Barber Update',
            'bio' => 'Nueva bio',
            'is_active' => true,
            'photo' => UploadedFile::fake()->image('nuevo-avatar.png'),
            'social_links' => [
                ['platform' => 'instagram', 'url' => 'https://instagram.com/nuevo'],
            ],
        ])
        ->assertRedirect(route('admin.barbers.index'));

    Storage::disk('public')->assertMissing('barbers/old-avatar.jpg');

    $profile->refresh();

    expect($profile->photo_path)->not->toBeNull()
        ->and($profile->photo_path)->toStartWith('barbers/')
        ->and($profile->social_links)->toBe([
            ['platform' => 'instagram', 'url' => 'https://instagram.com/nuevo'],
        ]);
});

test('admins can remove a saved photo with remove_photo flag', function () {
    Storage::disk('public')->put('barbers/foto-a-borrar.jpg', 'binary-fake-content');

    $barber = User::factory()->create(['phone' => '6005678']);
    $barber->assignRole('barber');

    $profile = BarberProfile::create([
        'user_id' => $barber->id,
        'display_name' => 'Barber Foto',
        'bio' => null,
        'photo_path' => 'barbers/foto-a-borrar.jpg',
        'social_links' => null,
        'is_active' => true,
    ]);

    Storage::disk('public')->assertExists('barbers/foto-a-borrar.jpg');

    $this->actingAs($this->admin)
        ->put(route('admin.barbers.update', ['barber' => $profile->id]), [
            'name' => 'Barber Foto',
            'email' => $barber->email,
            'phone' => '6001111',
            'display_name' => 'Barber Foto',
            'bio' => null,
            'is_active' => true,
            'remove_photo' => true,
        ])
        ->assertRedirect(route('admin.barbers.index'));

    Storage::disk('public')->assertMissing('barbers/foto-a-borrar.jpg');

    expect($profile->fresh()->photo_path)->toBeNull();
});

test('admins can remove social links by sending an empty array', function () {
    $barber = User::factory()->create(['phone' => '6005678']);
    $barber->assignRole('barber');

    $profile = BarberProfile::create([
        'user_id' => $barber->id,
        'display_name' => 'Barber Links',
        'bio' => null,
        'social_links' => [
            ['platform' => 'instagram', 'url' => 'https://instagram.com/x'],
        ],
        'is_active' => true,
    ]);

    $this->actingAs($this->admin)
        ->put(route('admin.barbers.update', ['barber' => $profile->id]), [
            'name' => 'Barber Links',
            'email' => $barber->email,
            'phone' => '6001111',
            'display_name' => 'Barber Links',
            'bio' => null,
            'is_active' => true,
            'social_links' => [],
        ])
        ->assertRedirect(route('admin.barbers.index'));

    expect($profile->fresh()->social_links)->toBe([]);
});

test('deleting a barber removes its photo from storage', function () {
    Storage::disk('public')->put('barbers/borrar.jpg', 'binary-fake-content');

    $barber = User::factory()->create(['phone' => '6005678']);
    $barber->assignRole('barber');

    $profile = BarberProfile::create([
        'user_id' => $barber->id,
        'display_name' => 'Barber Delete',
        'bio' => null,
        'photo_path' => 'barbers/borrar.jpg',
        'social_links' => null,
        'is_active' => true,
    ]);

    $this->actingAs($this->admin)
        ->from(route('admin.barbers.index'))
        ->delete(route('admin.barbers.destroy', ['barber' => $profile->id]));

    Storage::disk('public')->assertMissing('barbers/borrar.jpg');
});

test('barber photo and social links are validated', function () {
    $this->actingAs($this->admin)
        ->post(route('admin.barbers.store'), [
            'name' => 'Barber Invalid',
            'email' => 'invalid@example.com',
            'phone_prefix' => '0412',
            'phone_number' => '1234567',
            'display_name' => 'Barber Invalid',
            'is_active' => true,
            'photo' => UploadedFile::fake()->create('documento.pdf', 100),
            'social_links' => [
                ['platform' => 'snapchat', 'url' => 'no-es-una-url'],
            ],
            'password' => 'Secret-Password-123',
            'password_confirmation' => 'Secret-Password-123',
        ])
        ->assertSessionHasErrors(['photo', 'social_links.0.platform', 'social_links.0.url']);
});

test('index exposes photo_url and social_links for each barber', function () {
    $barber = User::factory()->create(['phone' => '6005678']);
    $barber->assignRole('barber');

    BarberProfile::create([
        'user_id' => $barber->id,
        'display_name' => 'Barber Visible',
        'bio' => 'Perfil con redes',
        'social_links' => [
            ['platform' => 'instagram', 'url' => 'https://instagram.com/visible'],
        ],
        'is_active' => true,
    ]);

    $this->actingAs($this->admin)
        ->get(route('admin.barbers.index'))
        ->assertOk()
        ->assertInertia(fn (Inertia\Testing\AssertableInertia $page) => $page
            ->component('admin/barbers/index')
            ->has('barbers', 1)
            ->has('barbers.0.photo_url')
            ->has('barbers.0.social_links', 1)
        );
});