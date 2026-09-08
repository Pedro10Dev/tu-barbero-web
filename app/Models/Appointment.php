<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int|null $user_id
 * @property string|null $guest_name
 * @property string|null $guest_phone
 * @property int $barber_profile_id
 * @property int $service_id
 * @property Carbon $start_time
 * @property Carbon $end_time
 * @property string $status
 * @property float $price_at_booking
 * @property string|null $notes
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Appointment extends Model
{
    protected $fillable = [
        'user_id',
        'guest_name',
        'guest_phone',
        'barber_profile_id',
        'service_id',
        'start_time',
        'end_time',
        'status',
        'price_at_booking',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'start_time' => 'datetime',
            'end_time' => 'datetime',
        ];
    }

    /** @return BelongsTo<User, $this> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /** @return BelongsTo<BarberProfile, $this> */
    public function barberProfile(): BelongsTo
    {
        return $this->belongsTo(BarberProfile::class);
    }

    /** @return BelongsTo<Service, $this> */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
