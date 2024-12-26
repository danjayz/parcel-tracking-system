<?php

namespace App\Events;

use App\Models\Parcel;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class ParcelStatusChanged implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $parcel;

    public function __construct(Parcel $parcel)
    {
        $this->parcel = $parcel;
    }

    public function broadcastOn()
    {

        // Retrieve all associated user IDs
        $userIds = $this->parcel->users()->pluck('user_id');

        // Map user IDs to channels
        return $userIds->map(function ($userId) {
            return new Channel('user.' . $userId);
        })->toArray();
    }

    public function broadcastAs()
    {
        return 'my-event';
    }
}