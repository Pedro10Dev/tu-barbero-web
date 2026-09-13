<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\PasswordValidationRules;
use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\BarberProfile;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class BarberController extends Controller
{
    use PasswordValidationRules;

    private const PHONE_PREFIXES = ['0412', '0414', '0424', '0416', '0426'];

    private const SOCIAL_PLATFORMS = ['instagram', 'tiktok', 'facebook', 'whatsapp', 'youtube', 'x'];

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
                    'photo_url' => $barber->photo_url,
                    'social_links' => $barber->social_links ?? [],
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
            'photo' => 'nullable|image|mimes:jpeg,png,webp,gif|max:4096',
            'social_links' => 'nullable|array|max:6',
            'social_links.*.platform' => 'required_with:social_links|string|in:'.implode(',', self::SOCIAL_PLATFORMS),
            'social_links.*.url' => 'required_with:social_links|url:http,https',
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

        $data = [
            'user_id' => $user->id,
            'display_name' => $validated['display_name'],
            'bio' => $validated['bio'] ?? null,
            'photo_path' => null,
            'social_links' => $validated['social_links'] ?? null,
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ];

        if ($request->hasFile('photo')) {
            $data['photo_path'] = $request->file('photo')->store('barbers', 'public');
        }

        BarberProfile::create($data);

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
                'photo_url' => $barber->photo_url,
                'social_links' => $barber->social_links ?? [],
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
            'photo' => 'nullable|image|mimes:jpeg,png,webp,gif|max:4096',
            'remove_photo' => 'nullable|boolean',
            'social_links' => 'nullable|array|max:6',
            'social_links.*.platform' => 'required_with:social_links|string|in:'.implode(',', self::SOCIAL_PLATFORMS),
            'social_links.*.url' => 'required_with:social_links|url:http,https',
        ]);

        $barber->user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
        ]);

        $data = [
            'display_name' => $validated['display_name'],
            'bio' => $validated['bio'] ?? null,
            'social_links' => isset($validated['social_links'])
                ? array_values($validated['social_links'])
                : null,
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ];

        if ($request->hasFile('photo')) {
            if ($barber->photo_path) {
                Storage::disk('public')->delete($barber->photo_path);
            }

            $data['photo_path'] = $request->file('photo')->store('barbers', 'public');
        } elseif (! empty($validated['remove_photo']) && $barber->photo_path) {
            Storage::disk('public')->delete($barber->photo_path);
            $data['photo_path'] = null;
        }

        $barber->update($data);

        return redirect()->route('admin.barbers.index')
            ->with('toast', ['type' => 'success', 'message' => 'Barbero actualizado correctamente.']);
    }

    public function destroy(BarberProfile $barber): RedirectResponse
    {
        $barber->loadMissing('user');

        Appointment::where('barber_profile_id', $barber->id)
            ->whereNull('barber_name')
            ->update(['barber_name' => $barber->display_name]);

        if ($barber->photo_path) {
            Storage::disk('public')->delete($barber->photo_path);
        }

        if ($barber->user !== null) {
            $barber->user->delete();

            return back()->with('toast', [
                'type' => 'success',
                'message' => 'Barbero y su usuario eliminados. El historial de citas se conservó.',
            ]);
        }

        $barber->delete();

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Barbero eliminado.',
        ]);
    }
}