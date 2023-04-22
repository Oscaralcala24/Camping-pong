import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { TaskService } from '../../service/task.service';
import { UserService } from 'src/app/service/userService/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

constructor(public authService: AuthService,private taskService:TaskService, private userService: UserService){
  
}

user:any;
  ngOnInit(): any {
    const getID = this.authService.getInfoToken(this.authService.getToken());
    console.log(getID);
  
    if(getID){
        const id = getID.id;
        var nombreUsuario
        const user = this.userService.getUsuario(id).subscribe(async data=> console.log(data))
     
      this.userService.getUsuario(id).subscribe((data: {}) => {
        this.user = data;
      });
    } 
    this.userService.user.subscribe(resAux => {
      console.log("prueba observable");
      console.log(resAux.consulta);
      this.user = resAux.consulta;
      
    }
  );

}
}