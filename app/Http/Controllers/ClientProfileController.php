<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ClientProfile;
use App\Enums\UserRole; // Ajusta el namespace de tu enum si es necesario

class ClientProfileController extends Controller
{
    public function edit(Request $request)
    {
        $user = $request->user();

        // Verificación usando tu Enum (ajusta el valor según tu implementación, ej: UserRole::CLIENT o UserRole::Client)
        // Si tu enum implementa s, puedes comparar con ->value o directamente si es un BackedEnum
        if ($user->role !== UserRole::CLIENT) { // Cambia UserRole::Client por el nombre de tu Enum y caso
            return redirect('/');
        }

        $clientProfile = ClientProfile::firstOrCreate(
            ['user_id' => $user->id],
            [
                'phone' => '',
                'full_name' => $user->name, // <--- Añade esto
            ]
        );

        return Inertia::render('client/profile/edit', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $clientProfile->phone ?? $user->phone ?? '',
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
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
        ]);

        $user->update([
            'name' => $validated['name'],
        ]);

        ClientProfile::updateOrCreate(
            ['user_id' => $user->id],
            ['phone' => $validated['phone']]
        );

        return redirect()->back()->with('success', 'Perfil actualizado correctamente.');
    }
}