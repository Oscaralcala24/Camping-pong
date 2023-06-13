import { Component } from '@angular/core';
import { ModalBorrarusuarioComponent } from '../modal-borrarusuario/modal-borrarusuario.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/service/userService/user.service';
import { User } from 'src/app/models/user';
import { ModalGenerarPasswordComponent } from '../modal-generar-password/modal-generar-password.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  constructor(private userService: UserService, private dialog: MatDialog,private toastr: ToastrService,private router:Router) {

  }


  ngOnInit(): void {

    this.userService.getAllUsers().subscribe((data) =>{
      console.log(data);
      this.usuarios = data.consulta;

    })
    
   
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
            this.toastr.success(res.status)
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate(['/admin/lista-usuarios']);
          });
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
          this.userService.generatePassword(this.usuario._id,this.usuario.email).subscribe((data) =>{
            if ( data == "Cambios confirmados" ) {
              this.toastr.success("Contraseña cambiada correctamente", "Correo enviado a usuario")
            }else{
              this.toastr.error("Error al generar nueva contraseña")

            }
          })
        })
      }
    });

  }

}
