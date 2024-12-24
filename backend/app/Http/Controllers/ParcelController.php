<?php

namespace App\Http\Controllers;

use App\Models\Parcel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ParcelController extends Controller
{
    /**
     * Display a listing of the parcels.
     */
    public function getParcels()
    {
        $parcels = Parcel::all();

        return response([
            'data' => [
                'parcels' => $parcels],
            'msg' => 'Parcels received successfully'
        ]);
    }

    /**
     * Store a newly created parcel in storage.
     */
    public function addParcel(Request $req)
    {
        $data = $req->validate([
            'tracking_number' => 'required|max:255',
            'sender_name' => 'required|max:255',
            'receiver_name' => 'required|max:255',
            'address_line1' => 'required|max:255',
            'city' => 'required|max:255',
            'district' => 'required|max:255',
            'weight' => 'required|numeric',
            'dimensions' => 'required|max:255',
            'pickup_location' => 'required|max:255',
            'description' => 'nullable|string',
            'comments' => 'nullable|string',
        ]);

        $parcel = Parcel::create($data);

        return response([
            'data' => [
                'parcel' => $parcel
            ],
            'msg' => 'Parcel created successfully'
        ], 201);
        
    }

    /**
     * Display the specified parcel.
     */
    public function getParcel($id)
    {
        $parcel = Parcel::where('tracking_number', $id)->first();
    
        if (!$parcel) {
            return response()->json([
                'status' => 404,
                'message' => 'Parcel not found'
            ], 404);
        }
        return response([
            'data' => [
                'parcel' => $parcel],
            'msg' => 'Parcel received successfully'
        ], 200);
    }

    /**
     * Remove the specified parcel from storage.
     */
    public function deleteParcel($id)
    {
        $parcel = Parcel::find($id);
    
        if (!$parcel) {
            return response()->json([
                'status' => 404,
                'message' => 'Parcel not found'
            ], 404);
        }
    
        $parcel->delete();

        return response([
            'msg' => 'Parcel deleted successfully'
        ], 200);
    }

    /**
     * Update the specified parcel in storage.
     */
    public function updateParcel(Request $req, $id)
    {
        $parcel = Parcel::find($id);
    
        if (!$parcel) {
            return response()->json([
                'status' => 404,
                'message' => 'Parcel not found'
            ], 404);
        }

        $data = $req->validate([
            'state' => 'required|max:255',
        ]);

        $parcel->state = $data['state'];
        $parcel->save();
    
        // return response()->json([
        //     'status' => 200,
        //     'parcel' => $parcel,
        //     'message' => 'Parcel updated successfully'
        // ]);

        return response([
            'data' => [
                'parcel' => $parcel],
            'msg' => 'Parcel updated successfully'
        ], 200);
    }
}
