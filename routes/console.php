<?php

use App\Models\User;

Schedule::call(function () {
    User::whereNull('email_verified_at')
        ->where('created_at', '<', now()->subDays(3))
        ->delete();
})->daily();
