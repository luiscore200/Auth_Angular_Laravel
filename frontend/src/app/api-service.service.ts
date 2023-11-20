import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { User } from './user';
 
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
url:string = 'http://127.0.0.1:8000/api'
  constructor(private http:HttpClient) { }

  login(objeto:User):Observable<User>{
    return this.http.post<User>(this.url+'/login', objeto);
  }

  register(objeto:User):Observable<User>{
    return this.http.post<User>(this.url+'/register', objeto);
  }
  sendPasswordResetLink(objeto:User):Observable<User>{
    return this.http.post<User>(this.url+'/sendPasswordResetLink', objeto);
  }

 
}
