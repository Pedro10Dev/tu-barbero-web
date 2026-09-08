<?php

namespace App\Http\Controllers\Agenda;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceListController extends Controller
{
    public function index(Request $request): Response
    {
        $services = Service::query()
            ->orderBy('name')
            ->get()
            ->map(function (Service $service): array {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'duration_minutes' => $service->duration_minutes,
                    'price' => $service->price,
                    'isOffered' => true,
                ];
            })
            ->values();

        return Inertia::render('services/index', [
            'services' => $services,
        ]);
    }
}
