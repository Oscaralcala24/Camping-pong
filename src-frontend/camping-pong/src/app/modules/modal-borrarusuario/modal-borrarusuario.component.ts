import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-borrarusuario',
  templateUrl: './modal-borrarusuario.component.html',
  styleUrls: ['./modal-borrarusuario.component.scss']
})
export class ModalBorrarusuarioComponent {
  constructor(private dialogRef: MatDialogRef<ModalBorrarusuarioComponent>){}
  resultado = Boolean(false)
  
  confirmDelete() {
    this.dialogRef.close(true);
  }
}
