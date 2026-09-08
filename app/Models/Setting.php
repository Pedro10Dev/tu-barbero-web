<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property string $key
 * @property string|null $value
 */
class Setting extends Model
{
    public $timestamps = false;

    protected $fillable = ['key', 'value'];
}
