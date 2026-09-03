<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PhonePromptController extends Controller
{
    public function create()
    {
        return Inertia::render('auth/CompletePhone');
    }

    public function store(Request $request)
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