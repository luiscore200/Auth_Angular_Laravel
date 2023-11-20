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

  constructor (private fb:FormBuilder,private api:ApiServiceService){
      this.form=this.fb.group({ email: ['', [Validators.required, Validators.email]]});
  }

  ngDoCheck():void{
    this.emailControl=this.form.get('email');
  }

  onSubmit():void{
    if(this.form.valid){
      this.api.sendPasswordResetLink(this.form.value).subscribe(
        data=>console.log(data),
        error=>console.log(error)
      );
      this.handleResponse();
    }
  }

  handleResponse():void {
    this.form.reset();
  
  }
}
