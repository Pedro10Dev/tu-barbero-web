<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class ForcedPasswordController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('auth/forced-password', [
            'userName' => $request->user()?->name,
            'passwordRules' => Password::defaults()->toPasswordRulesString(),
        ]);
    }
}
