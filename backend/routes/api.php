<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ParcelController;
use App\Http\Controllers\NotificationController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Public routes
// Register a user
Route::post('register', [UserController::class, 'register']);

// Login a user
// Route::post('login', [UserController::class, 'login']);
Route::post('login', [UserController::class, 'login']);

// Get a single parcel
Route::get('/parcels/{id}', [ParcelController::class, 'getParcel']);


// Protected routes
Route::middleware('auth:sanctum')->group(function () {

    // Add a parcel
    Route::post('/parcels/addParcel', [ParcelController::class, 'addParcel']);

    // Get all parcels
    Route::get('/parcels', [ParcelController::class, 'getParcels']);

    // Delete a parcel
    Route::delete('/parcels/{id}', [ParcelController::class, 'deleteParcel']);

    // Update a parcel
    Route::put('/parcels/{id}', [ParcelController::class, 'updateParcel']);

    // Logout
    Route::post('logout', [UserController::class, 'logout']);

    // Get a user
    Route::get('user_id', [UserController::class, 'get_user_id']);

    // Add parcel to user
    Route::post('addParcelToUser', [UserController::class, 'addParcelToUser']);

    // Get user parcels
    Route::get('userParcels', [UserController::class, 'getUserParcels']);

    // Delete user parcel
    Route::delete('userParcel/{id}', [UserController::class, 'deleteUserParcel']);
});