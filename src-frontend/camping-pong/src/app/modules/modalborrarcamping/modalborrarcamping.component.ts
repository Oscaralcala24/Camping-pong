import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-modalborrarcamping',
  templateUrl: './modalborrarcamping.component.html',
  styleUrls: ['./modalborrarcamping.component.scss']
})
export class ModalborrarcampingComponent {
  constructor(private dialogRef: MatDialogRef<ModalborrarcampingComponent>){}
  resultado = Boolean(false)
  
  confirmDelete() {
    this.dialogRef.close(true);
  }
}
