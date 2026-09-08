<?php

namespace App\Http\Controllers\Agenda;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class ClientListController extends Controller
{
    public function index(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();
        $barberProfile = $user->barberProfile()->first();

        if ($barberProfile === null) {
            return Inertia::render('client/index', [
                'clients' => [],
            ]);
        }

        $appointments = Appointment::where('barber_profile_id', $barberProfile->id)
            ->with(['user', 'service'])
            ->orderByDesc('start_time')
            ->get();

        Carbon::setLocale('es');

        $clients = $this->buildClients($appointments);

        return Inertia::render('client/index', [
            'clients' => $clients,
        ]);
    }

    /** @param  Collection<int, Appointment>  $appointments
     * @return array<int, array<string, mixed>> */
    private function buildClients(Collection $appointments): array
    {
        return $appointments
            ->groupBy(function (Appointment $appointment): string {
                return $appointment->user_id !== null
                    ? 'user:'.$appointment->user_id
                    : 'guest:'.($appointment->guest_name ?? 'anonimo');
            })
            ->map(function (Collection $items): array {
                $appointments = $items->values();
                $first = $appointments->first();
                $user = $first->user;

                $visits = $appointments
                    ->filter(fn (Appointment $a) => in_array($a->status, ['confirmed', 'completed'], true))
                    ->count();

                $last = $appointments->sortByDesc('start_time')->first();

                $favorite = $appointments
                    ->groupBy('service_id')
                    ->sortByDesc(fn ($group) => $group->count())
                    ->first()
                    ?->first()
                    ?->service
                    ?->name;

                $phone = $user->phone ?? $first->guest_phone ?? null;

                return [
                    'id' => $first->user_id ?? crc32($first->guest_name ?? 'anonimo'),
                    'name' => $user->name ?? $first->guest_name ?? 'Cliente',
                    'email' => $user->email ?? null,
                    'phone' => $phone,
                    'phoneFormatted' => $phone ?? '',
                    'totalVisits' => max($visits, 1),
                    'lastVisit' => $last->start_time->diffForHumans(),
                    'favoriteService' => $favorite,
                    'notes' => $last->notes ?? '—',
                ];
            })
            ->values()
            ->all();
    }
}
