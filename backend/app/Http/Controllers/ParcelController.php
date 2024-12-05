<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Parcel;

class ParcelController extends Controller
{
    // public function addParcel(Request $req) {
    //     $parcel = new Parcel;
    //     $parcel->tracking_number = $req->trackingNumber;
    //     $parcel->address_line1 = $req->addressLine1;
    //     $parcel->city = $req->city;
    //     $parcel->district = $req->district;
    //     $parcel->weight = $req->weight;
    //     $parcel->dimensions = $req->dimensions;
    //     $parcel->description = $req->description;
    //     $parcel->comments = $req->comments; // Can be null
    //     $parcel->save();

    //     return response()->json([
    //         'status' => 200,
    //         'parcel' => $parcel,
    //         'message' => 'Parcel created successfully'
    //     ]);
    // }

    public function getParcels() {
        $parcels = Parcel::all();
        return response()->json([
            'status' => 200,
            'parcels' => $parcels
        ]);
    }

    public function getParcel($id) {
        $parcel = Parcel::where('tracking_number', $trackingNumber)->first();
        return response()->json([
            'status' => 200,
            'parcel' => $parcel
        ]);
    }

    // public function addParcel(Request $req) {
    //     $parcel = new Parcel;
    //     $parcel->tracking_number = $req->tracking_number;

    //     $parcel->address_line1 = $req->address_line1;
    //     $parcel->city = $req->city;
    //     $parcel->district = $req->district;
    //     $parcel->weight = $req->weight;
    //     $parcel->dimensions = $req->dimensions;
    //     $parcel->description = $req->description;
    //     $parcel->comments = $req->comments; // Can be null
    //     $parcel->save();

    //     return response()->json([
    //         'status' => 200,
    //         'parcel' => $parcel,
    //         'message' => 'Parcel created successfully'
    //     ]);
    // }
}
