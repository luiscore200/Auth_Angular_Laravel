<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\userController;
use App\Http\Middleware\JWTmiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
Route::post('sendPasswordResetLink',[ResetPasswordController::class,'sendPasswordResetLink']);
Route::post('resetPassword',[ResetPasswordController::class,'resetPassword']);


Route::get('logout',[AuthController::class,'logout']);


Route::middleware('jwt.verify')->group(function(){
    Route::get('index',[userController::class,'index']);
    Route::get('show',[AuthController::class,'getaccount']);
    Route::get('refresh',[AuthController::class,'refresh']);
   
    
    
});
