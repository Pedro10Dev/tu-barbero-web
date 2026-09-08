<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        $services = Service::query()
            ->withCount('appointments')
            ->orderBy('name')
            ->get()
            ->map(function (Service $service): array {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'duration_minutes' => $service->duration_minutes,
                    'price' => $service->price,
                    'appointmentCount' => $service->appointments_count,
                ];
            })
            ->values();

        return Inertia::render('admin/services/index', [
            'services' => $services,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/services/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'duration_minutes' => 'required|integer|min:5|max:600',
            'price' => 'required|numeric|min:0',
        ]);

        Service::create($validated);

        return redirect()->route('admin.services.index')
            ->with('toast', ['type' => 'success', 'message' => 'Servicio creado correctamente.']);
    }

    public function edit(Service $service): Response
    {
        return Inertia::render('admin/services/edit', [
            'service' => [
                'id' => $service->id,
                'name' => $service->name,
                'duration_minutes' => $service->duration_minutes,
                'price' => $service->price,
            ],
        ]);
    }

    public function update(Request $request, Service $service): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'duration_minutes' => 'required|integer|min:5|max:600',
            'price' => 'required|numeric|min:0',
        ]);

        $service->update($validated);

        return redirect()->route('admin.services.index')
            ->with('toast', ['type' => 'success', 'message' => 'Servicio actualizado correctamente.']);
    }

    public function destroy(Service $service): RedirectResponse
    {
        if (! $service->appointments()->exists()) {
            $service->delete();

            return back()->with('toast', ['type' => 'success', 'message' => 'Servicio eliminado.']);
        }

        return back()->withErrors([
            'service' => 'No se puede eliminar un servicio con citas asociadas.',
        ]);
    }
}
