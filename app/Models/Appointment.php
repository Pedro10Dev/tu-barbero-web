<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'start_time' => 'datetime',
            'end_time' => 'datetime',
        ];
    }

    public function client()
    {
        return $this->belongsTo(ClientProfile::class, 'client_profile_id');
    }

    public function barber()
    {
        return $this->belongsTo(BarberProfile::class, 'barber_profile_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
