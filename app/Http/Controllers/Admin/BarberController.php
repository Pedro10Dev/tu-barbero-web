<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\PasswordValidationRules;
use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\BarberProfile;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class BarberController extends Controller
{
    use PasswordValidationRules;

    private const PHONE_PREFIXES = ['0412', '0414', '0424', '0416', '0426'];

    public function index(): Response
    {
        $startOfMonth = now()->startOfMonth();

        $barbers = BarberProfile::query()
            ->with('user')
            ->withCount('appointments')
            ->orderBy('display_name')
            ->get()
            ->map(function (BarberProfile $barber) use ($startOfMonth): array {
                return [
                    'id' => $barber->id,
                    'display_name' => $barber->display_name,
                    'bio' => $barber->bio,
                    'is_active' => (bool) $barber->is_active,
                    'email' => $barber->user->email,
                    'phone' => $barber->user->phone ?? null,
                    'appointmentCount' => $barber->appointments_count,
                    'monthlyCompleted' => Appointment::where('barber_profile_id', $barber->id)
                        ->where('status', 'completed')
                        ->where('start_time', '>=', $startOfMonth)
                        ->count(),
                ];
            })
            ->values();

        return Inertia::render('admin/barbers/index', [
            'barbers' => $barbers,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/barbers/create', [
            'passwordRules' => Password::defaults()->toPasswordRulesString(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'phone_prefix' => ['required', Rule::in(self::PHONE_PREFIXES)],
            'phone_number' => 'required|regex:/^[0-9]{7}$/',
            'display_name' => 'required|string|max:255',
            'bio' => 'nullable|string|max:1000',
            'is_active' => 'boolean',
            'password' => $this->passwordRules(),
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'email_verified_at' => null,
            'password' => $validated['password'],
            'phone' => $validated['phone_prefix'].$validated['phone_number'],
            'must_change_password' => true,
        ]);

        $user->assignRole('barber');

        $user->sendEmailVerificationNotification();

        BarberProfile::create([
            'user_id' => $user->id,
            'display_name' => $validated['display_name'],
            'bio' => $validated['bio'] ?? null,
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return redirect()->route('admin.barbers.index')
            ->with('toast', ['type' => 'success', 'message' => 'Barbero creado correctamente.']);
    }

    public function edit(BarberProfile $barber): Response
    {
        return Inertia::render('admin/barbers/edit', [
            'barber' => [
                'id' => $barber->id,
                'user_id' => $barber->user_id,
                'name' => $barber->user->name,
                'email' => $barber->user->email,
                'phone' => $barber->user->phone ?? null,
                'display_name' => $barber->display_name,
                'bio' => $barber->bio,
                'is_active' => (bool) $barber->is_active,
            ],
        ]);
    }

    public function update(Request $request, BarberProfile $barber): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,'.$barber->user_id,
            'phone' => 'nullable|string|max:20',
            'display_name' => 'required|string|max:255',
            'bio' => 'nullable|string|max:1000',
            'is_active' => 'boolean',
        ]);

        $barber->user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
        ]);

        $barber->update([
            'display_name' => $validated['display_name'],
            'bio' => $validated['bio'] ?? null,
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return redirect()->route('admin.barbers.index')
            ->with('toast', ['type' => 'success', 'message' => 'Barbero actualizado correctamente.']);
    }

    public function destroy(BarberProfile $barber): RedirectResponse
    {
        if (! $barber->appointments()->exists()) {
            $barber->delete();

            return back()->with('toast', ['type' => 'success', 'message' => 'Barbero eliminado.']);
        }

        return back()->withErrors([
            'barber' => 'No se puede eliminar un barbero con citas asociadas.',
        ]);
    }
}
