import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-generar-password',
  templateUrl: './modal-generar-password.component.html',
  styleUrls: ['./modal-generar-password.component.scss']
})
export class ModalGenerarPasswordComponent {
  constructor(private modalPassword: MatDialogRef<ModalGenerarPasswordComponent>){}
  resultado = Boolean(false)
  
  confirmGeneratePassword() {
    this.modalPassword.close(true);
  }
}
