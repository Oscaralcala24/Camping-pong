import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent {
  hide = true;
  user = {
      email:"",
      contrasena: ""
  }
  error: string;
  requestFailed: boolean;
    constructor( private authService: AuthService, private router : Router ,private userService: UserService,private toastr: ToastrService){}

  signIn(){
    this.authService.signInAdmin(this.user).subscribe(
      res => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('role', res.data.role)
        const getID = this.authService.getInfoToken(this.authService.getToken());

        if(getID){
        
        this.userService.setUser(res.data) 
        this.toastr.success("Sesión iniciada con exito")   
        this.router.navigate(['/admin/dashboard']);
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
