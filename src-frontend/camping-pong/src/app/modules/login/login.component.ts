import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
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
    constructor( private authService: AuthService, private router : Router ,private userService: UserService){}
  ngOnInit() {
    
  }
  irRegistro(){
    this.router.navigate(['/registro'])
  }

  signIn(){
    this.authService.signIn(this.user).subscribe(
      res => {
        console.log(res.token)
        localStorage.setItem('token', res.token)
        
        this.router.navigate(['/'])
        .then(() => {
          window.location.reload();
        });
      },
      err => console.log(err),
    )
  }

}
