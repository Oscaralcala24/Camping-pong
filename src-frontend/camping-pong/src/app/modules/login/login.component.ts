import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/userService/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  user = {
      email:"",
      contrasena: ""
  }
  error: string;
requestFailed: boolean;
    constructor( private authService: AuthService, private router : Router ,private userService: UserService){}
  ngOnInit() {
    
  }
  irRegistro(){
    this.router.navigate(['/registro'])
  }

  signIn(){
    this.authService.signIn(this.user).subscribe(
      res => {
        localStorage.setItem('token', res.token)
        const getID = this.authService.getInfoToken(this.authService.getToken());
        
        
        if(getID){
        
        this.userService.setUser(res.data) 
        this.router.navigate(['/'])
        }
      },
      err => {
        console.log(err.error.error);
        this.requestFailed = true,
        this.error = err.error.error;
      },

    )
  }
}