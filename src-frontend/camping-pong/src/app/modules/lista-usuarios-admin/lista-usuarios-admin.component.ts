import { Component } from '@angular/core';
import { ModalBorrarusuarioComponent } from '../modal-borrarusuario/modal-borrarusuario.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/service/userService/user.service';
import { User } from 'src/app/models/user';
import { ModalGenerarPasswordComponent } from '../modal-generar-password/modal-generar-password.component';

@Component({
  selector: 'app-lista-usuarios-admin',
  templateUrl: './lista-usuarios-admin.component.html',
  styleUrls: ['./lista-usuarios-admin.component.scss']
})
export class ListaUsuariosAdminComponent {
  p: number = 1;
  filterText:string ="";
  usuarios: any[] = [];

  usuario :any;
  dialogRef: MatDialogRef<ModalBorrarusuarioComponent>;
  modalPassword: MatDialogRef<ModalGenerarPasswordComponent>;
  constructor(private userService: UserService, private dialog: MatDialog) {

  }


  ngOnInit(): void {

    this.userService.getAllUsers().subscribe((data) =>{
      console.log(data);
      this.usuarios = data.consulta;

    })
    
   
  }

  onClick(event: Event) {
    console.log(this.usuarios);
    // Obtener el elemento HTML del botón
    const target = event.target as HTMLElement;
    
    // Obtener el ID del botón
    const buttonId = target.id;
    
    console.log('ID del botón:', buttonId);
  }



  openModal(enterAnimationDuration: string, exitAnimationDuration: string, event :Event): void {
   
    const target = event.target as HTMLElement;
    const buttonId = target.id;


    this.dialogRef = this.dialog.open(ModalBorrarusuarioComponent, {
      width: '500px',
      height: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    this.dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.userService.deleteUser(buttonId).subscribe(
          res => {
            alert(res)
            window.location.reload();
          },
          err => console.log(err),
        )
      }
    });
  }


  openModalContrasena(enterAnimationDuration: string, exitAnimationDuration: string, event :Event): void {

    const target = event.target as HTMLElement;
    const buttonId = target.id;
    console.log(buttonId);

    this.modalPassword = this.dialog.open(ModalGenerarPasswordComponent, {
      width: '500px',
      height: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    this.modalPassword.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.userService.getUsuario(buttonId).subscribe((data) =>{
          console.log(data)
          this.usuario = data.consulta;
          console.log(this.usuario._id)
          console.log(this.usuario.email)
          this.userService.generatePassword(this.usuario._id,this.usuario.email).subscribe((data) =>{
            alert(data)
          })
        })
      }
    });

  }

}
