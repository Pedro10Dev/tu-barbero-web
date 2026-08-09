<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Crear usuario principal para el Barbero
        $barberUser = User::create([
            'name' => 'Carlos Barbero',
            'email' => 'admin@barberflow.com',
            'password' => Hash::make('password123'),
            'role' => UserRole::BARBER,
        ]);

        // 2. Crear su perfil profesional asociado
        $barberUser->barberProfile()->create([
            'display_name' => 'Carlos - Master Barber',
            'bio' => 'Especialista en degradados y barba clásica con más de 5 años de experiencia.',
            'is_active' => true,
        ]);
    }
}
