import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree , Router} from '@angular/router';
import { AuthService } from '.././service/auth/auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

    
  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      
    if (!this.authService.loggedIn()) {
  
      this.router.createUrlTree(['/login']);
      return false;
    }
    return true;

  }
}