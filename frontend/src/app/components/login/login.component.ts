
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { AuthService } from 'src/app/auth.service';
import { TokenService } from 'src/app/token.service';
import { User } from 'src/app/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  form:FormGroup;
  emailControl:any;
  passwordControl:any;
  objeto!:User;
  error!:any;

  constructor( private fb:FormBuilder, private api:ApiServiceService, private token:TokenService, private router:Router, private auth:AuthService){
    this.form=this.fb.group({
     email: ['', [Validators.required, Validators.email]],
     password:['',[Validators.required]]
    });
  }

  ngDoCheck(): void{
  //  console.log(this.form);
    this.emailControl=this.form.get("email");
    this.passwordControl=this.form.get("password");
  }

  onSubmit():void {
     console.log(this.form.value);
     
     if(this.form.valid){
      this.objeto = this.form.value;
      this.api.login(this.objeto).subscribe(
        data=>this.handleData(data),
        error=> this.handleError(error)
       );
  
    }else {    
      alert("formulario invalido")
    }  
  }
  handleData(data:any):void {
      console.log(data);
      this.token.handleToken(data.access_token);
      this.auth.changeAuthStatus(true);
      this.router.navigateByUrl('/profile')
  }

  handleError(error:any):void {
    this.error = error.error.error;
  }
}
