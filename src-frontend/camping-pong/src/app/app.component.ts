import { Component, OnInit } from '@angular/core';
import { UserService } from './service/userService/user.service';
import { AuthService } from './service/auth/auth.service';
import { Router } from '@angular/router';
import { CampingService } from './service/campingService/camping.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'camping-pong';
  constructor(private userService: UserService, private authService: AuthService, private router:Router, private campingService:CampingService) { }
  ngOnInit(): void {
    const getID = this.authService.getInfoToken(this.authService.getToken());
    if (getID) {
      this.userService.getUsuario(getID.id).subscribe((user) => {
        if (user?.consulta) {
          this.userService.setUser(user.consulta);
        }
      })
    }else{
      this.userService.setUser(null);
    }
    
  }


}
