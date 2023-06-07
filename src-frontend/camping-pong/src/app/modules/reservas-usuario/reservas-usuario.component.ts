import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/userService/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from 'src/app/service/reservaService/reserva.service';
import * as moment from 'moment';
import { CampingService } from 'src/app/service/campingService/camping.service';
import { PreciosService } from 'src/app/service/preciosService/precios.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalCancelarReservaComponent } from '../modal-cancelar-reserva/modal-cancelar-reserva.component';
import { ModalValorarCampingComponent } from '../modal-valorar-camping/modal-valorar-camping.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reservas-usuario',
  templateUrl: './reservas-usuario.component.html',
  styleUrls: ['./reservas-usuario.component.scss']
})
export class ReservasUsuarioComponent {
  user!: User
  disabled = true;

  idUsuario: string;
  reservas: any = [];
  reservasAux: any = [];
  precios: any;
  reservasPendientes = [];
  reservasPasadas = [];
  dialogRef: MatDialogRef<ModalCancelarReservaComponent>;
  dialogReValorar: MatDialogRef<ModalValorarCampingComponent>;
  constructor(private router:Router,private _snackBar: MatSnackBar,private dialog: MatDialog, private authService: AuthService, private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private reservaService: ReservaService, private campingService: CampingService, private preciosService: PreciosService) {

  }



  ngOnInit(): void {


    this.idUsuario = this.authService.getInfoToken(this.authService.getToken()).id;

    console.log(this.idUsuario);
    this.reservaService.getReservas().subscribe((data) => {
      data.consulta.forEach(element => {
        if (element.id_reserva.id_usuario == this.idUsuario) {
          this.reservas.push(element);
        }
      })

      this.reservas.forEach(element => {
        var camping;
        this.campingService.getCamping(element.id_reserva.id_camping).subscribe(data => {
          camping = data.consulta
          var sumatotal = 0
          this.preciosService.getPrecios(camping._id).subscribe(precios => {
            this.precios = precios.consulta
            let fechaPago = new Date(element.id_reserva.fecha_pago);
            let fechaEntrada = new Date(element.id_reserva.fecha_entrada);
            let fechaSalida = new Date(element.id_reserva.fecha_salida);
            let fechaEntrada2 = moment(fechaEntrada.getFullYear() + "-" + (fechaEntrada.getMonth() + 1) + "-" + fechaEntrada.getDate(), 'YYYY-MM-DD');
            let fechaSalida2 = moment(fechaSalida.getFullYear() + "-" + (fechaSalida.getMonth() + 1) + "-" + fechaSalida.getDate(), 'YYYY-MM-DD');
            
            const noches = this.calcularNochesPorTemporada(fechaEntrada2, fechaSalida2);
            console.log(noches);
            let datosAux = [];
            if (noches.Baja > 0) {
              datosAux.push({ temporada: "Baja", cantidadNoches: noches.Baja, preciosAux: [] });
            }
            if (noches.Media > 0) {
              datosAux.push({ temporada: "Media", cantidadNoches: noches.Media, preciosAux: [] });
            }
            if (noches.Alta > 0) {
              datosAux.push({ temporada: "Alta", cantidadNoches: noches.Alta, preciosAux: [] });
            }
            
            
            this.precios.forEach(precios => {
              
              for (let index = 0; index < datosAux.length; index++) {
                if(precios.temporada === datosAux[index].temporada){
                  element.detalle.forEach(detalle => {
                    
                    
                    for (let j = 0; j < precios.detalle_precio.length; j++) {
                      
                      if (detalle.nombre == precios.detalle_precio[j].nombre && detalle.cantidad > 0) {
                        sumatotal += detalle.cantidad * precios.detalle_precio[j].precio * datosAux[index].cantidadNoches;
                        datosAux[index].preciosAux.push({ nombre: precios.detalle_precio[j].nombre, cantidad: detalle.cantidad, precio: precios.detalle_precio[j].precio })
                        
                      }
                      
                    }
                  })
                }
              }
            });
            console.log(sumatotal);
            if (element.id_reserva.estado == "Pendiente") {
              this.reservasPendientes.push({
                id_reserva: element.id_reserva,
                nombre_camping: camping.nombre,
                fecha_pago: fechaPago.getDate() + "/" + (fechaPago.getMonth() + 1) + "/" + fechaPago.getFullYear(),
                fechaEntradaAux: fechaEntrada.getDate() + "/" + (fechaEntrada.getMonth() + 1) + "/" + fechaEntrada.getFullYear(),
                fechaSalidaAux: fechaSalida.getDate() + "/" + (fechaSalida.getMonth() + 1) + "/" + fechaSalida.getFullYear(),
                detalle: datosAux,
                sumatotal: sumatotal,
                imagen: camping.imagenes[0],
                estado: element.id_reserva.estado
              })
            } else {
              this.reservasPasadas.push({
                id_reserva: element.id_reserva,
                nombre_camping: camping.nombre,
                fecha_pago: fechaPago.getDate() + "/" + (fechaPago.getMonth() + 1) + "/" + fechaPago.getFullYear(),
                fechaEntradaAux: fechaEntrada.getDate() + "/" + (fechaEntrada.getMonth() + 1) + "/" + fechaEntrada.getFullYear(),
                fechaSalidaAux: fechaSalida.getDate() + "/" + (fechaSalida.getMonth() + 1) + "/" + fechaSalida.getFullYear(),
                detalle: datosAux,
                sumatotal: sumatotal,
                imagen: camping.imagenes[0],
                estado: element.id_reserva.estado
              })
      
            }
            console.log(this.reservasPasadas);
          })
        });
      })
    })
  }







  calcularNochesPorTemporada(fechaEntrada, fechaSalida) {
    let fechaActual = moment(fechaEntrada);


    const noches = {
      Baja: 0,
      Media: 0,
      Alta: 0
    };

    while (fechaActual.isBefore(fechaSalida)) {
      const temporada = this.clasificarFecha(fechaActual);
      noches[temporada]++;
      fechaActual.add(1, 'days');
    }

    return noches;
  }


  clasificarFecha(fecha) {


    let tempBajaInicio
    let tempBajaFin
    let tempMediaInicio
    let tempMediaFin
    let tempAltaInicio
    var tempAltaFin
    for (let index = 0; index < this.precios.length; index++) {
      let arrayini;
      let arrayfin;
      
      if (this.precios[index].temporada == "Baja") {

        tempBajaInicio = moment(this.precios[index].fecha_inicio);
        tempBajaFin = moment(this.precios[index].fecha_fin);
        if (!tempBajaInicio.isBefore(tempBajaFin)) {
          let fechaActual = new Date()
          
          tempBajaFin.add(1, 'year') 
        }
      } else if (this.precios[index].temporada == "Media") {
        tempMediaInicio = moment(this.precios[index].fecha_inicio);
        tempMediaFin = moment(this.precios[index].fecha_fin);
        if (!tempMediaInicio.isBefore(tempMediaFin)) {
          tempMediaFin.add(1, 'year') 
        }
      } else {

        tempAltaInicio = moment(this.precios[index].fecha_inicio);
        tempAltaFin = moment(this.precios[index].fecha_fin);
      }
      
    }


    if (fecha.isBetween(tempBajaInicio, tempBajaFin, null, '[]')) {
      return 'Baja';
    } else if (fecha.isBetween(tempMediaInicio, tempMediaFin, null, '[]')) {
      return 'Media';
    } else {
      return 'Alta';
    }
  }

  cancelarReserva(id: string) {
    this.reservaService.cancelarReserva(id).subscribe(data => {
      console.log(data);

    })
  }



  openModal(enterAnimationDuration: string, exitAnimationDuration: string, event: Event): void {

    const target = event.target as HTMLElement;
    const buttonId = target.id;


    this.dialogRef = this.dialog.open(ModalCancelarReservaComponent, {
      width: '500px',
      height: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    this.dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.cancelarReserva(buttonId)
      }
    });
  }


  valorarCamping(enterAnimationDuration: string, exitAnimationDuration: string, event) {
    const target = event.currentTarget as HTMLElement;
    const buttonId = target.id;

    this.dialogReValorar = this.dialog.open(ModalValorarCampingComponent, {
      width: '500px',
      height: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    this.dialogReValorar.afterClosed().subscribe((body) => {
      if (body.resultado == true) {
        this.reservaService.valorarReserva(buttonId, body.puntuacion).subscribe(data => {
          this._snackBar.open(data, "Aceptar");    
          location.reload();
        })
      }
    });
  }


}
