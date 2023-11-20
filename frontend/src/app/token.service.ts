import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login:'http://127.0.0.1:8000/api/login',
    register:'http://127.0.0.1:8000/api/register' 
  }
  constructor() { }

  //atrapar el token en el servicio
  handleToken(token:any):void{
    this.set(token);
    console.log(this.payload(token));
    console.log(this.isValid());
  }

    //guardar el token en local
  set(token:any):void {
  localStorage.setItem('token', token);

  }
  get(){
    return localStorage.getItem('token');
  }

  remove():void {
    localStorage.removeItem('token');
  }

  //validar
  isValid():boolean {
  
    if(this.get()){
      const payload= this.payload(this.get()); 
      if(payload){
        return Object.values(this.iss).indexOf(payload.iss)>-1? true: false;
      }
    }
    return false;
    
  }
 //separar la carga util
  payload(token:any){
    const payload= token.split('.')[1]; 
     return this.decode(payload);
  }
  //decodificar
  decode(payload:any){
    return JSON.parse(atob(payload));
  }

  loggedIn():boolean{
   return  this.isValid();
  }
}
