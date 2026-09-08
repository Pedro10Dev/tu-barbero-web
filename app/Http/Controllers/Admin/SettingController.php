<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    private const KEYS = [
        'business_name' => 'nombre del negocio',
        'business_phone' => 'teléfono',
        'business_whatsapp' => 'WhatsApp',
        'business_address' => 'dirección',
        'business_hours' => 'horario',
    ];

    public function index(): Response
    {
        $stored = Setting::query()->pluck('value', 'key')->all();

        $business = [];
        foreach (array_keys(self::KEYS) as $key) {
            $business[$key] = $stored[$key] ?? ($key === 'business_name' ? config('app.name') : '');
        }

        return Inertia::render('admin/settings/index', [
            'business' => $business,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'business_name' => 'required|string|max:255',
            'business_phone' => 'nullable|string|max:20',
            'business_whatsapp' => 'nullable|string|max:20',
            'business_address' => 'nullable|string|max:255',
            'business_hours' => 'nullable|string|max:500',
        ]);

        foreach ($validated as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return back()->with('toast', ['type' => 'success', 'message' => 'Ficha del negocio actualizada.']);
    }
}
