<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property int $user_id
 * @property string $display_name
 * @property string|null $bio
 * @property string|null $photo_path
 * @property array<int, array{platform: string, url: string}>|null $social_links
 * @property string $photo_url
 * @property bool $is_active
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class BarberProfile extends Model
{
    protected $fillable = [
        'user_id',
        'display_name',
        'bio',
        'photo_path',
        'social_links',
        'is_active',
    ];

    protected $casts = [
        'social_links' => 'array',
    ];

    /** @return BelongsTo<User, $this> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /** @return HasMany<Appointment, $this> */
    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }

    public function getPhotoUrlAttribute(): string
    {
        if ($this->photo_path !== null && $this->photo_path !== '') {
            return Storage::disk('public')->url($this->photo_path);
        }

        return asset('images/barber-placeholder.svg');
    }
}