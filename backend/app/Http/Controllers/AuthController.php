<?php

namespace App\Http\Controllers;

use App\Http\Requests\loginRequest;
use App\Http\Requests\registerRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;



class AuthController extends Controller
{   //registrar/register
    public function register(registerRequest $request)
    {

        $existing = User::where('email', $request->email)->first();

        if ($existing) {
            return response()->json(['error' => 'the email has already been taken'], 422);
        }else{

            $user = User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>Hash::make($request->password)
            ]);
            $token = JWTAuth::fromUser($user);
            return response()->json(['user'=>$user, 'token'=>$token],201);
        }
       
    }



        //login/iniciar sesion
    public function login(loginRequest $request)
    {
       $credentials = $request->only('email', 'password');
        try{
            if(!$token=JWTAuth::attempt($credentials)){
                return response()->json(['error'=>'invalid credentials'],400);
            }
        }catch(JWTException $e){      
            return response()->json(['error'=>'no created token'],500);
        }
        return $this->respondWithToken($token);
    }

    //account info/datos del usuario
    public function getaccount()
    {
       return response()->json(auth()->user());
       
    }

    //logout/cerrar sesion
    public function logout()
    {
        auth()->logout();
       return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(JWTAuth::refresh());
     
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->guard()->factory()->getTTL() * 60
            
        ]);
    }
   

 
}
