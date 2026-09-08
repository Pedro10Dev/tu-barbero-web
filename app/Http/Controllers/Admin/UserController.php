<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::query()
            ->withCount('appointments')
            ->with('roles')
            ->orderByDesc('created_at')
            ->get()
            ->map(function (User $user): array {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone ?? null,
                    'emailVerified' => $user->email_verified_at !== null,
                    'createdAt' => $user->created_at->format('d/m/Y'),
                    'roles' => $user->getRoleNames()->all(),
                    'appointmentCount' => $user->appointments_count,
                ];
            })
            ->values();

        return Inertia::render('admin/users/index', [
            'users' => $users,
        ]);
    }

    public function updateRole(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'role' => ['required', Rule::in(['client', 'barber', 'admin'])],
        ]);

        $currentUser = $request->user();

        if ($currentUser !== null && $currentUser->id === $user->id && $validated['role'] !== 'admin') {
            return back()->withErrors([
                'role' => 'No puedes quitarte el rol de administrador a ti mismo.',
            ]);
        }

        $user->syncRoles([$validated['role']]);

        if ($validated['role'] === 'barber' && ! $user->barberProfile()->exists()) {
            // Al promover a un barbero sin perfil, se crea uno básico para que pueda operar.
            $user->barberProfile()->create([
                'display_name' => $user->name,
                'is_active' => true,
            ]);
        }

        return back()->with('toast', ['type' => 'success', 'message' => 'Rol actualizado correctamente.']);
    }
}
