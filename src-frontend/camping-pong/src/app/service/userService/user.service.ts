
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  private URL = "http://localhost:3000/usuarios/";
  
  
  private userobj$ = new BehaviorSubject<User>({
    nombre: "",
    apellidos: "",
    dni: "",
    nickname: "",
    email: "",
    telefono: null,
    role: ""
  });
  
  constructor(private http:HttpClient , private router : Router , private authService: AuthService) {}
  ngOnInit(): void {
    
  }

  getUsuario(id) : Observable<any>{
    return this.http.get<User[]>(this.URL + id)
  }

  get dataUser() : Observable<User>{
    return this.userobj$.asObservable();
  }

  setUser(user:User) : void{
    console.log(user)
    this.userobj$.next(user);
  }


}


