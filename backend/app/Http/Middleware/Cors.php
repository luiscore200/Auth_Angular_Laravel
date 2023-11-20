<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request)  ->header('Access-Control-Allow-Origin','*')
                                ->header('Access-Control-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS')
                                ->header('Access-Control-Allow-Headers','Content-Type,Authorization');
    }
}
