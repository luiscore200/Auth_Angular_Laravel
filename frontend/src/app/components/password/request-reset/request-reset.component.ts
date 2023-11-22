import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/api-service.service';


@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent {

  form:FormGroup;
  emailControl:any;
  error!:any;
  msg!:any;

  constructor (private fb:FormBuilder,private api:ApiServiceService){
      this.form=this.fb.group({ email: ['', [Validators.required, Validators.email]]});
  }

  ngDoCheck():void{
    this.emailControl=this.form.get('email');
  }

  onSubmit():void{
    if(this.form.valid){
      this.api.sendPasswordResetLink(this.form.value).subscribe(
        data=>this.handleResponse(data),
        error=>this.handleError(error)
      );
      this.error=null;
      this.msg=null;
     
    }
  }

  handleResponse(data:any):void {
    this.msg =data.message;
    console.log(data);
    this.form.reset();
  
  }
  handleError(error:any):void {
    this.error = error.error.error;
    console.log(error);
  }

}
