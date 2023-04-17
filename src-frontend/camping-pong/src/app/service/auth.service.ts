import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private URL = "http://localhost:3000/usuarios"
  constructor(private http:HttpClient , private router : Router) { }
  signIn(user:any){
   // const headers = new Headers();
   // headers.append('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post<any>(this.URL + '/login', JSON.stringify(user),{
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
    console.log(JSON.stringify(user))
    console.log(user)
    return this.http.post<any>(this.URL + '/registro', JSON.stringify(user),{
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
    this.router.navigate(['/']);
  }

}
