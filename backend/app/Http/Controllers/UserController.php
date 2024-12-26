<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    //
    function register(Request $req) {

        $validator = Validator::make($req->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:4',
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        } else {
            $user = User::create([
                'name' => $req->name,
                'email' => $req->email,
                'password' => Hash::make($req->password),
            ]);

            $token = $user->createToken($user->email."_Token")->plainTextToken;

            return response()->json([
                'status' => 200,
                'user' => $user,
                'token' => $token,
                'message' => 'User created successfully'
            ]);
        }


    }

    function login(Request $req) {

        $validator = Validator::make($req->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        } else {
            $user = User::where('email', $req->email)->first();

            if (!$user || !Hash::check($req->password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid credentials'
                ]);
            } else {
                $token = $user->createToken($user->email."_Token")->plainTextToken;

                return response()->json([
                    'status' => 200,
                    'user' => $user,
                    'user_type' => $user->userType,
                    'token' => $token,
                    'message' => 'User logged in successfully'
                ]);
            }
        }

    }

    function get_user_id() {
        return response()->json([
            'status' => 200,
            'user_id' => Auth::id(),
        ]);
    }


    // Get user parcels (should receive all parcels in the user_parcel table)
    function getUserParcels() {
        // Get the authenticated user
        $user = Auth::user();
    
        // Ensure user is authenticated
        if (!$user) {
            return response()->json([
                'status' => 401,
                'message' => 'Unauthorized. Please log in to continue.',
            ], 401);
        }
    
        // Get the user's parcels
        $parcels = $user->parcels;
    
        // Respond with the user's parcels
        return response()->json([
            'status' => 200,
            'parcels' => $parcels,
        ]);
    }

    // Add parcel to user to user_parcel table
    function addParcelToUser(Request $req) {
        // Validate the incoming request data
        $validator = Validator::make($req->all(), [
            'parcel_id' => 'required|exists:parcels,id', // Ensure parcel ID exists in the parcels table
        ], [
            'parcel_id.required' => 'The parcel ID is required.',
            'parcel_id.exists' => 'The provided parcel ID does not exist in our records.',
        ]);
    
        // Return validation errors if any
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
            ], 422);
        }
    
        try {
            // Get the authenticated user
            $user = Auth::user();
    
            // Ensure user is authenticated
            if (!$user) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Unauthorized. Please log in to continue.',
                ], 401);
            }
    
            // Check if the parcel is already attached to the user
            if ($user->parcels()->where('parcel_id', $req->parcel_id)->exists()) {
                return response()->json([
                    'status' => 409,
                    'message' => 'Parcel is already added to the user.',
                ], 409);
            }
    
            // Attach the parcel to the user
            $user->parcels()->attach($req->parcel_id);
    
            // Respond with success
            return response()->json([
                'status' => 200,
                'message' => 'Parcel added to user successfully.',
            ]);
        } catch (\Exception $e) {
            // Handle any unexpected errors
            return response()->json([
                'status' => 500,
                'message' => 'An error occurred while adding the parcel.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Delete user parcel
    function deleteUserParcel($id) {
        // Get the authenticated user
        $user = Auth::user();
    
        // Ensure user is authenticated
        if (!$user) {
            return response()->json([
                'status' => 401,
                'message' => 'Unauthorized. Please log in to continue.',
            ], 401);
        }
    
        // Get the user parcel
        $userParcel = $user->parcels()->where('parcel_id', $id)->first();
    
        // Ensure user parcel exists
        if (!$userParcel) {
            return response()->json([
                'status' => 404,
                'message' => 'User parcel not found.',
            ], 404);
        }
    
        // Delete the user parcel
        $userParcel->delete();
    
        // Respond with success
        return response()->json([
            'status' => 200,
            'message' => 'User parcel deleted successfully.',
        ]);
    }

    


    function logout() {
        auth()->user()->tokens()->delete();

        return response()->json([
            'status' => 200,
            'message' => 'User logged out successfully'
        ]);
    }

    
}
