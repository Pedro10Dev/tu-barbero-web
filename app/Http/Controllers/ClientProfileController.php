<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Enums\UserRole;

class ClientProfileController extends Controller
{
    public function edit(Request $request)
    {
        $user = $request->user();

        if ($user->role !== UserRole::CLIENT) {
            return redirect('/');
        }

        return Inertia::render('client/profile/edit', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone ?? '',
            ]
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        if ($user->role !== UserRole::CLIENT) {
            return redirect('/');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
        ]);

       
        $user->update([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
        ]);

        return redirect()->back()->with('success', 'Perfil actualizado correctamente.');
    }
}