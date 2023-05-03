import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {
  constructor(public authService: AuthService, private userService: UserService , private router:Router){
  
  }
  
  user!:User
    ngOnInit(): any {
      this.userService.dataUser.subscribe((data) =>{
        this.user = data;
      })
  
  }
}
