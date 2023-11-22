import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { TokenService } from 'src/app/token.service';
import { User } from 'src/app/user';




@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent {

  form:FormGroup;
  emailControl:any;
  passwordControl:any;
  confirmPControl:any;
  error:any;
  Token:any;
  objeto!:User;
  msg!:any;

  constructor( private fb:FormBuilder, private api:ApiServiceService, private route:ActivatedRoute,private router:Router){
    

    route.queryParams.subscribe(params => this.Token= params['token'])

    this.form=this.fb.group({
     
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
     password_confirmation:['',[Validators.required]]
    });
  }

  passwordMatchValidator() {

    if (!this.confirmPControl) {
    return { required: true };
   }
    if(this.passwordControl.value == this.confirmPControl.value) 
    { return null}else
    { return this.confirmPControl.setErrors({ mismatch: true})} 

  }
  ngDoCheck():void { 
 
    this.emailControl= this.form.get('email');
    this.passwordControl= this.form.get('password');
    this.confirmPControl=this.form.get('password_confirmation');
    this.passwordMatchValidator();
  
    }

    onSubmit():void{
      this.objeto = {
        
        email:this.form.get("email")?.value,
        password:this.form.get("password")?.value,
        password_confirmation:this.form.get("password_confirmation")?.value,
        resetToken:this.Token
  
       }
       // console.log(this.objeto);
        
        this.api.ChangePassword(this.objeto).subscribe(
          data=> this.handleResponse(data),
          error => this.handleError(error)
        )

        this.error=null;
        this.msg=null;
    }

    handleResponse(data:any):void{
      //console.log(data);
      this.msg= data.message;
      this.router.navigateByUrl('/login');
    }

    handleError(error:any):void {
      this.error = error.error.error;
      console.log(error);
    }
  

}
