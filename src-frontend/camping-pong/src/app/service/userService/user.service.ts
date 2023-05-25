
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
  
  
  private userobj$ = new BehaviorSubject<User>(null);
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
    this.userobj$.next(user);
  }
  updateUser(user:any, id:string) : Observable<any>{
    return this.http.put<User[]>(this.URL +'updateUser/' +id, user)
  }
  updatePassword(user:any, id:string) : Observable<any>{
    return this.http.put<User[]>(this.URL +'updatePassword/' +id, user)
  }

  getAllUsers() : Observable<any>{
    return this.http.get<any>(this.URL+ "listaUsuarios")
  }

  deleteUser(id:string) : Observable<User>{
    return this.http.delete<any>(this.URL + 'borrar/'+id);
  }

  generatePassword(id:string,email:string) : Observable<any>{
    return this.http.put<User[]>(this.URL +'generarContrasena', {_id:id,email:email});
  }
  registerUserAdmin(data) : Observable<any>{
    return this.http.post<User[]>(this.URL +'registroAdmin',data);
  }

  
}


