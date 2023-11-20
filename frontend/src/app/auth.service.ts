import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logeedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  authStatus = this.logeedIn.asObservable();
  
  constructor(private token:TokenService) { }

  changeAuthStatus(value: boolean){
    this.logeedIn.next  (value);
  }
}
