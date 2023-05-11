import { Component } from '@angular/core';
import { Camping } from 'src/app/models/camping';
import { CampingService } from 'src/app/service/campingService/camping.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalborrarcampingComponent } from '../modalborrarcamping/modalborrarcamping.component';
@Component({
  selector: 'app-lista-camping-admin',
  templateUrl: './lista-camping-admin.component.html',
  styleUrls: ['./lista-camping-admin.component.scss']
})
export class ListaCampingAdminComponent {
  p:Number = 1;
  filterText:string ="";
  campings: any[] = [];
  dialogRef: MatDialogRef<ModalborrarcampingComponent>;
  constructor(private campingService: CampingService, private dialog: MatDialog) {

  }


  ngOnInit(): void {

    this.campingService.getListaCamping({}).subscribe((data) =>{
      console.log(data);
      this.campings = data.filteredCamping;
    })
    
   
  }

  onClick(event: Event) {
    console.log(this.campings);
    // Obtener el elemento HTML del botón
    const target = event.target as HTMLElement;
    
    // Obtener el ID del botón
    const buttonId = target.id;
    
    console.log('ID del botón:', buttonId);
  }



  openModal(enterAnimationDuration: string, exitAnimationDuration: string, event :Event): void {
   
    const target = event.target as HTMLElement;
    
    // Obtener el ID del botón
    const buttonId = target.id;
 

    this.dialogRef = this.dialog.open(ModalborrarcampingComponent, {
      width: '500px',
      height: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    this.dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.campingService.deleteCamping(buttonId).subscribe(
          res => {
            alert(res)
            window.location.reload();
          },
          err => console.log(err),
        )
      }
    });
    

  }
}

