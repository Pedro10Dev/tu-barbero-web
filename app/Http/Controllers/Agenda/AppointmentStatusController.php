<?php

namespace App\Http\Controllers\Agenda;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AppointmentStatusController extends Controller
{
    public function update(Request $request, Appointment $appointment): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();
        $barberProfile = $user->barberProfile()->first();

        if ($barberProfile === null || $appointment->barber_profile_id !== $barberProfile->id) {
            abort(403);
        }

        $validated = $request->validate([
            'action' => ['required', Rule::in(['accept', 'reject'])],
        ]);

        if ($appointment->status !== 'pending') {
            return back()->withErrors([
                'action' => 'Solo se pueden procesar citas pendientes.',
            ]);
        }

        $action = $validated['action'];

        if ($action === 'accept') {
            $appointment->update(['status' => 'confirmed']);

            $appointment->newQuery()
                ->where('barber_profile_id', $barberProfile->id)
                ->where('status', 'pending')
                ->where('id', '!=', $appointment->id)
                ->where('start_time', '<', $appointment->end_time)
                ->where('end_time', '>', $appointment->start_time)
                ->update(['status' => 'rejected']);

            return back()->with('toast', ['type' => 'success', 'message' => 'Cita confirmada correctamente.']);
        }

        $appointment->update(['status' => 'rejected']);

        return back()->with('toast', ['type' => 'success', 'message' => 'Cita rechazada.']);
    }
}
