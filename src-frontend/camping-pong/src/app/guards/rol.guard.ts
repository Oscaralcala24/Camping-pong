import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/userService/user.service';
import { AuthService } from '../service/auth/auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {
  user!:User
  constructor(private userService: UserService,private router: Router,private authService: AuthService){
    this.userService.dataUser.subscribe((data) =>{
      this.user = data;
      console.log(this.user);
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.user.role === 'administrador' && this.authService.loggedIn()) {
        return true;
      }else{
      this.router.navigate(["/"])
      return false;
      }
    
  }
  
}
