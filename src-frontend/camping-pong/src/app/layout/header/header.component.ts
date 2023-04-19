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
  user = {
    
  }
  ngOnInit(): any {
      // const getID = this.authService.getInfoToken(this.authService.getToken());
      // console.log(getID);
      
      // if(getID){
      //     const id = getID.id;
      //     var nombreUsuario
      //     const user = this.authService.getUsuario(id).subscribe(async data=> console.log(data))
          
      //   this.authService.getUsuario(id).subscribe((data: {}) => {
      //     this.user = data;
      //   });
      } 
}
