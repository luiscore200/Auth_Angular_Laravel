import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{

  public loggedIn!:boolean;

  constructor(private auth:AuthService, private router:Router, private token:TokenService){}

  ngOnInit(){
    this.auth.authStatus.subscribe(value => this.loggedIn= value);
   
  }
  logOut(){
    this.token.remove();
    this.auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login')
  }
  

}
