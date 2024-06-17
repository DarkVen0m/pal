<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        return User::create($request->validated());
    }

    public function login(LoginRequest $request)
    {
        if (!Auth::attempt($request->validated())) {
            return response()->json([
                'errors' => [
                    'credentials' => ['Wrong credentials']
                ]
            ], 403);
        }
        $user = Auth::user();
        $token = $user->createToken($user->name)->plainTextToken;
        return response()->json([
            'access_token' => $token,
            'username' => $user->name
        ]);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'message' => 'logged out'
        ]);
    }
}
