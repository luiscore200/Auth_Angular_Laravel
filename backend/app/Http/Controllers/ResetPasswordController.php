<?php

namespace App\Http\Controllers;

use App\Mail\resetPasswordMail;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;







class ResetPasswordController extends Controller
{
    //----------------------------------------------------------------------------- Generate and send TokenReset
    public function sendPasswordResetLink(Request $request ){

        try{

        $existing = User::where('email', $request->email)->first();
        if ($existing) {
            $this->sendEmail($request->email);
            return response()->json(['message' => 'Reset Email is send successfully, please ckeck your inbox']);
        }else{
            return response()->json(['success'=>false,'error' => 'the email is not in use'],404);
        }
        }catch(Exception $e){
        return response()->json([ 'success'=>false,  'error' => $e->getMessage()]);
        }
    }


    public function generateToken($email){
        $oldToken = DB::table('password_reset_tokens')->where('email',$email)->first();
        if($oldToken){ return $oldToken;}


        $token = Str::random(60);
        $this->saveToken($token,$email);
        return $token;
    }

   public function saveToken($token,$email){
        DB::table('password_reset_tokens')->insert([
            'email'=>$email,
            'token'=>$token,
            'created_at'=>Carbon::now()
        ]);

    }

    public function sendEmail($email){

            $token= $this->generateToken($email);
            Mail::to($email)->send(new resetPasswordMail($token->token));
    }
    //------------------------------------------------------ catch tokenReset and validate password 

    public function resetPassword(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|confirmed', 
        ]);
        try{
            $row = DB::table('password_reset_tokens')->where('email', $request->email)->where('token', $request->resetToken)->first();
            if($row){

                $user=User::Where('email',$request->email)->first();
                $user->update(['password'=>$request->password]);
                DB::table('password_reset_tokens')->where('email', $request->email)->where('token', $request->resetToken)->delete();               
                return Response()->json(['success'=>true,'message'=>'password has been updated'],200);
            }else{
                return response()->json(['success'=>false,'error' => 'Token or Email is incorrect'],404);
            }

        }catch(Exception $e){
            return response()->json([ 'error' => $e->getMessage()]);
        }
        
      

        
    }
  

    }