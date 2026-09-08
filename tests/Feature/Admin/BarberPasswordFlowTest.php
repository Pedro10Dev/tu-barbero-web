<?php

use App\Models\BarberProfile;
use App\Models\User;

function createPendingPasswordChangeBarber(): User
{
    $barber = User::factory()->create([
        'phone' => '04141234567',
        'email_verified_at' => null,
        'password' => 'pasade-temporary',
        'must_change_password' => true,
    ]);
    $barber->assignRole('barber');

    BarberProfile::create([
        'user_id' => $barber->id,
        'display_name' => 'Barber Test',
        'is_active' => true,
    ]);

    return $barber;
}

test('a barber with a temporary password is redirected to the forced password change', function () {
    $barber = createPendingPasswordChangeBarber();
    $barber->markEmailAsVerified();

    $this->actingAs($barber)
        ->get(route('dashboard'))
        ->assertRedirect(route('password.force'));
});

test('the forced password page is only available while the flag is pending', function () {
    $barber = createPendingPasswordChangeBarber();
    $barber->markEmailAsVerified();

    $this->actingAs($barber)
        ->get(route('password.force'))
        ->assertOk();

    $barber->update(['must_change_password' => false]);

    $this->actingAs($barber)
        ->get(route('password.force'))
        ->assertRedirect(route('dashboard'));
});

test('changing the password clears the forced change flag', function () {
    $barber = createPendingPasswordChangeBarber();
    $barber->markEmailAsVerified();

    $this->actingAs($barber)
        ->from(route('password.force'))
        ->put(route('user-password.update'), [
            'current_password' => 'pasade-temporary',
            'password' => 'New-Secure-Password-123',
            'password_confirmation' => 'New-Secure-Password-123',
        ])
        ->assertSessionHasNoErrors();

    expect($barber->fresh()->must_change_password)->toBeFalse();
});

test('a barber with a temporary password cannot change it with a wrong current password', function () {
    $barber = createPendingPasswordChangeBarber();
    $barber->markEmailAsVerified();

    $this->actingAs($barber)
        ->put(route('user-password.update'), [
            'current_password' => 'wrong-password',
            'password' => 'New-Secure-Password-123',
            'password_confirmation' => 'New-Secure-Password-123',
        ])
        ->assertSessionHasErrors('current_password');

    expect($barber->fresh()->must_change_password)->toBeTrue();
});
