import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { AfterloginService } from './afterlogin.service';
import { BeforeloginService } from './beforelogin.service';

const appRoutes:Routes =[
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{
  path: 'login',
  component: LoginComponent,
  canActivate: [BeforeloginService]
},
{
  path: 'signup',
  component: SignupComponent,
  canActivate: [BeforeloginService]
},
{
  path: 'profile',
  component: ProfileComponent,
  canActivate: [AfterloginService]
},
{
  path: 'request-password-reset',
  component: RequestResetComponent,
  canActivate: [BeforeloginService]
},
{
  path: 'response-password-reset',
  component: ResponseResetComponent,
  canActivate: [AfterloginService]
},

]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
