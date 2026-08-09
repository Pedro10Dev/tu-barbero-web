<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'name' => 'Corte Clásico / Degradado',
                'duration_minutes' => 30,
                'price' => 15.00,
            ],
            [
                'name' => 'Perfilado de Barba con Toalla Caliente',
                'duration_minutes' => 20,
                'price' => 10.00,
            ],
            [
                'name' => 'Combo: Corte + Barba',
                'duration_minutes' => 45,
                'price' => 22.00,
            ],
            [
                'name' => 'Corte Infantil',
                'duration_minutes' => 30,
                'price' => 12.00,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
