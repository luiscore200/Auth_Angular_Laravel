import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { TokenService } from 'src/app/token.service';
import { User } from 'src/app/user';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

    
  form:FormGroup;
  emailControl:any;
  passwordControl:any;
  objeto!:User;
  error!:any;
  confirmPControl:any;
  nameControl:any;

  constructor( private fb:FormBuilder, private api:ApiServiceService, private router:Router, private token:TokenService){
    this.form=this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
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
  onSubmit():void {
    console.log(this.form.value);
    
    if(this.form.valid){
     this.objeto = {
      name:this.form.get("name")?.value,
      email:this.form.get("email")?.value,
      password:this.form.get("password")?.value,
      password_confirmation:this.form.get("password_confirmation")?.value

     }
     console.log(this.objeto);
     this.api.register(this.objeto).subscribe(
       data=>this.handleData(data),
       error=> this.handleError(error)
       
      );
 
   }else {    
     alert("formulario invalido")
   }  
 }

  ngDoCheck():void { 
  this.nameControl= this.form.get('name');
  this.emailControl= this.form.get('email');
  this.passwordControl= this.form.get('password');
  this.confirmPControl=this.form.get('password_confirmation');
  this.passwordMatchValidator();

  }

  handleData(data:any):void {
    console.log(data);
    this.token.handleToken(data.access_token);
    this.router.navigateByUrl('/profile')
}


  handleError(error:any):void {
    this.error = error.error.message;
    console.log(error);
  }

}
