<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Parcel extends Model {
    protected $fillable = [
        'tracking_number',
        'address_line1',
        'city',
        'district',
        'weight',
        'dimensions',
        'description',
        'comments'
    ];
}