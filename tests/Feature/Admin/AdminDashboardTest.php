<?php

use App\Models\Appointment;
use App\Models\BarberProfile;
use App\Models\Service;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->admin = User::factory()->create(['phone' => '6001234']);
    $this->admin->assignRole('admin');

    $barber = User::factory()->create(['phone' => '6005678']);
    $barber->assignRole('barber');

    $this->profile = BarberProfile::create([
        'user_id' => $barber->id,
        'display_name' => 'Barber Test',
        'is_active' => true,
    ]);

    $this->service = Service::create([
        'name' => 'Corte Clásico',
        'duration_minutes' => 30,
        'price' => 15.00,
    ]);

    Appointment::create([
        'user_id' => $barber->id,
        'guest_name' => null,
        'guest_phone' => null,
        'barber_profile_id' => $this->profile->id,
        'service_id' => $this->service->id,
        'start_time' => now()->addDay()->format('Y-m-d H:i:s'),
        'end_time' => now()->addDay()->addMinutes(30)->format('Y-m-d H:i:s'),
        'status' => 'pending',
        'price_at_booking' => $this->service->price,
    ]);
});

test('the admin dashboard shows the real stats, recent appointments and activity', function () {
    $this->actingAs($this->admin)
        ->get(route('admin.dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/dashboard')
            ->has('stats', fn (Assert $stats) => $stats
                ->has('totalUsers')
                ->has('totalAppointments')
                ->has('activeBarbers')
                ->has('appointmentsToday')
                ->has('totalServices')
            )
            ->has('recentAppointments', 1, fn (Assert $item) => $item
                ->has('id')
                ->has('client')
                ->has('barber')
                ->has('service')
                ->has('start_time')
                ->has('status')
            )
            ->has('recentActivity', fn (Assert $activity) => $activity
                ->each(fn (Assert $item) => $item
                    ->has('id')
                    ->has('title')
                    ->has('description')
                    ->where('tone', fn (string $tone) => in_array($tone, ['emerald', 'blue', 'rose'], true))
                )
            )
        );
});

test('the admin dashboard counts appointments scheduled for today, not created today', function () {
    Appointment::create([
        'user_id' => null,
        'guest_name' => 'Cliente Hoy',
        'guest_phone' => '61112233',
        'barber_profile_id' => $this->profile->id,
        'service_id' => $this->service->id,
        'start_time' => now()->format('Y-m-d 14:00:00'),
        'end_time' => now()->format('Y-m-d 14:30:00'),
        'status' => 'confirmed',
        'price_at_booking' => $this->service->price,
    ]);

    $this->actingAs($this->admin)
        ->get(route('admin.dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/dashboard')
            ->where('stats.appointmentsToday', 1)
        );
});

test('the admin dashboard reflects the barber role in the user count', function () {
    $this->actingAs($this->admin)
        ->get(route('admin.dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/dashboard')
            ->where('stats.totalUsers', User::count())
            ->where('stats.totalAppointments', Appointment::count())
        );
});
