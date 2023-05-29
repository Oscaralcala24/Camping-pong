import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-valorar-camping',
  templateUrl: './modal-valorar-camping.component.html',
  styleUrls: ['./modal-valorar-camping.component.scss']
})
export class ModalValorarCampingComponent {
  constructor(private dialogRef: MatDialogRef<ModalValorarCampingComponent>){}
  puntuacion:Number =0;
  valorar() {

    let body = {puntuacion:this.puntuacion, resultado : true}
    this.dialogRef.close(body);
  }
  onClick(evento){
    this.puntuacion = evento.rating;

  }
}
