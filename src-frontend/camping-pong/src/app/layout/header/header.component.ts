import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/userService/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

constructor(public authService: AuthService, private userService: UserService){
  
}

user!:User
  ngOnInit(): any {
    this.userService.dataUser.subscribe((data) =>{
      this.user = data;
      
    })

}
}