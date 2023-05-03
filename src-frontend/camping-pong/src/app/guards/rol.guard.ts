import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { UserService } from '../service/userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {
  constructor(private userService: UserService, private router:Router){}

  canActivate(route: Route): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.hasRole(route);
  }

  hasRole(route:Route | ActivatedRouteSnapshot){
    
    const allowedRoles = route.data?.['allowedRoles']
    
    return this.userService.dataUser.pipe(
      map((user) => Boolean(allowedRoles.includes(localStorage.getItem("role")))),
      tap((hasRole) => hasRole === false && this.router.navigate(["/"]))
    )
  }
  
}
