import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = "http://localhost:3000";
  private userobj = new BehaviorSubject<any>({});
  user = this.userobj.asObservable();


    constructor(private http:HttpClient , private router : Router , private authService: AuthService) { }

  getUsuario(id){
    this.user = this.http.get<User[]>(this.URL + '/usuarios/' + id);
    return this.user;  
  }


}
