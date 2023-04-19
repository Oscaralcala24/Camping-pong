import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private URL = "http://localhost:3000"

  constructor(private http:HttpClient , private router : Router) { }
  signIn(user:any){
    return this.http.post<any>(this.URL + '/usuarios/login', JSON.stringify(user),{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
                                .set('Accept', 'application/json')
                                .set('Access-Control-Allow-Headers', 'Content-Type')
    });
  }
  signUp(user:any){
    user = {
      nombre:user.nombre,
      apellidos:user.apellidos,
      dni:user.dni,
      nickname:user.nickname,
      email:user.email,
      contrasena: user.contrasena,
      telefono:user.telefono,
    }
    return this.http.post<any>(this.URL + '/usuarios/registro', JSON.stringify(user),{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
                                .set('Accept', 'application/json')
                                .set('Access-Control-Allow-Headers', 'Content-Type')
    });
  }

  loggedIn() : boolean{
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });
  }

  getInfoToken(token: any): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  getUsuario(id: any):Observable<User[]>{
    
    return this.http.get<User[]>(this.URL + '/usuarios/' + id)
    

  }


}
