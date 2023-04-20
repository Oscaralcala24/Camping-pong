import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
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
    constructor( private authService: AuthService, private router : Router){}
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
        // .then(() => {
        //   window.location.reload();
        // });
        console.log("prueba2")
        console.log(res)
        console.log(res.data._id)
        this.authService.getUsuario(res.data._id);
      },
      err => console.log(err),
    )
  }

}
