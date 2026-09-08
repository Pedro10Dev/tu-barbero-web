<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PhonePromptController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('auth/CompletePhone');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'phone' => ['required', 'string', 'size:11'],
        ]);

        $user = $request->user();
        $user->phone = $request->phone;
        $user->save();

        return redirect()->intended(route('dashboard'));
    }
}
