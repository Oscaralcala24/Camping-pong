import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-cancelar-reserva',
  templateUrl: './modal-cancelar-reserva.component.html',
  styleUrls: ['./modal-cancelar-reserva.component.scss']
})
export class ModalCancelarReservaComponent {
  constructor(private dialogRef: MatDialogRef<ModalCancelarReservaComponent>){}
  resultado = Boolean(false)
  
  confirmDelete() {
    this.dialogRef.close(true);
  }
}
