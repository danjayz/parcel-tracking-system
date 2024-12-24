<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Parcel extends Model {
    protected $fillable = [
        'tracking_number',
        'sender_name',
        "receiver_name",
        'address_line1',
        'city',
        'district',
        'weight',
        'dimensions',
        'pickup_location',
        'description',
        'comments'
    ];
}