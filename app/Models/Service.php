<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property int $duration_minutes
 * @property float $price
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Service extends Model
{
    protected $fillable = [
        'name',
        'duration_minutes',
        'price',
    ];

    /** @return HasMany<Appointment, $this> */
    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }
}
