<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;


class JWTmiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        try{
            JWTAuth::parseToken()->authenticate();
        }catch(Exception $e){
          
            if($e instanceof TokenInvalidException){
                return response()->json(['status'=>'invalid token'],401);
            }else  if($e instanceof TokenExpiredException){
                return response()->json(['status'=>'token expired'],401);
            }
            return response()->json(['status'=>'token not found'],401);
        }
        return $next($request);
    }
}
