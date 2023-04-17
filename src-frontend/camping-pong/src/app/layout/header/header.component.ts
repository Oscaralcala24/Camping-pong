import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { TaskService } from '../../service/task.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

constructor(public authService: AuthService,private taskService:TaskService){}
  ngOnInit(): void {
    const token = this.authService.getToken();
    if(token){
      const tokenInfo = JSON.stringify(this.taskService.DecodeToken(token));
      console.log(tokenInfo);
    }
    
    
  }

}
