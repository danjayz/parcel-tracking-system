<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

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
                    'token' => $token,
                    'message' => 'User logged in successfully'
                ]);
            }
        }

    }

    function logout() {
        auth()->user()->tokens()->delete();

        return response()->json([
            'status' => 200,
            'message' => 'User logged out successfully'
        ]);
    }
}
