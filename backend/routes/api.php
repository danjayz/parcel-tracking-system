<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ParcelController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [UserController::class, 'logout']);
});

Route::post('/parcels/addParcel', [ParcelController::class, 'addParcel']);

// Get all parcels
Route::get('/parcels', [ParcelController::class, 'getParcels']);

// Get a single parcel
Route::get('/parcels/{id}', [ParcelController::class, 'getParcel']);