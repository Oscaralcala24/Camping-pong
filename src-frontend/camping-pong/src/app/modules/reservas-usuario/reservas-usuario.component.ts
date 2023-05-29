import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/userService/user.service';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from 'src/app/service/reservaService/reserva.service';
import * as moment from 'moment';
import { CampingService } from 'src/app/service/campingService/camping.service';
import { PreciosService } from 'src/app/service/preciosService/precios.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalCancelarReservaComponent } from '../modal-cancelar-reserva/modal-cancelar-reserva.component';
import { ModalValorarCampingComponent } from '../modal-valorar-camping/modal-valorar-camping.component';

@Component({
  selector: 'app-reservas-usuario',
  templateUrl: './reservas-usuario.component.html',
  styleUrls: ['./reservas-usuario.component.scss']
})
export class ReservasUsuarioComponent {
  user!: User
  disabled = true;
  updateDataForm: FormGroup;
  idUsuario: string;
  reservas: any = [];
  reservasAux: any = [];
  precios: any;
  reservasPendientes = [];
  reservasPasadas = [];
  dialogRef: MatDialogRef<ModalCancelarReservaComponent>;
  dialogReValorar: MatDialogRef<ModalValorarCampingComponent>;
  constructor(private dialog: MatDialog,private authService: AuthService, private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private reservaService: ReservaService, private campingService: CampingService, private preciosService: PreciosService) {

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
      console.log(this.reservas);
      this.reservas.forEach(element => {
        var camping;
        this.campingService.getCamping(element.id_reserva.id_camping).subscribe(data => {
          camping = data.consulta
          this.preciosService.getPrecios(camping._id).subscribe(data => {
            this.precios = data.consulta

            let fechaPago = new Date(element.id_reserva.fecha_pago);
            let fechaEntrada = new Date(element.id_reserva.fecha_entrada);
            let fechaSalida = new Date(element.id_reserva.fecha_salida);
            let fechaEntrada2 = moment(fechaEntrada.getFullYear() + "-" + (fechaEntrada.getMonth() + 1) + "-" + fechaEntrada.getDate(), 'YYYY-MM-DD');
            let fechaSalida2 = moment(fechaSalida.getFullYear() + "-" + (fechaSalida.getMonth() + 1) + "-" + fechaSalida.getDate(), 'YYYY-MM-DD');
            const noches = this.calcularNochesPorTemporada(fechaEntrada2, fechaSalida2);
            let datosAux = [];

            if (noches.Baja > 0) {
              datosAux.push({ temporada: "Baja", cantidadNoches: noches.Baja, precios: [] });
            }
            if (noches.Media > 0) {
              datosAux.push({ temporada: "Media", cantidadNoches: noches.Media, precios: [] });

            }
            if (noches.Alta > 0) {
              datosAux.push({ temporada: "Alta", cantidadNoches: noches.Alta, precios: [] });
            }

            var sumatotal = 0

            this.precios.forEach(element => {

              for (let j = 0; j < datosAux.length; j++) {
                if (element.temporada == datosAux[j].temporada) {
                  for (let l = 0; l < this.reservas.length; l++) {

                    this.reservas[l].detalle.forEach(precios => {
                      element.detalle_precio.forEach(k => {

                        if (k.nombre == precios.nombre && precios.cantidad > 0) {
                          sumatotal += precios.cantidad * k.precio;
                          datosAux[j].precios.push({ nombre: precios.nombre, cantidad: precios.cantidad, precio: k.precio })
                        }
                      })
                    })
                  }
                }
              }

            });
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

          });

        });
      })

    });


  }

  public errorHandling = (control: string, error: string) => {
    return this.updateDataForm.controls[control].hasError(error);
  }



  actualizardatos() {

    let userAux = {
      nombre: this.updateDataForm.get("nombre").value,
      apellidos: this.updateDataForm.get("apellidos").value,
      dni: this.updateDataForm.get("dni").value,
      email: this.updateDataForm.get("email").value,
      telefono: this.updateDataForm.get("telefono").value,
    }


    this.userService.updateUser(userAux, this.user._id).subscribe(
      res => {
        console.log(res)
      },
      err => console.log(err),
    )
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
      arrayini = this.precios[index].fecha_inicio.split("/")
      arrayfin = this.precios[index].fecha_fin.split("/")
      if (this.precios[index].temporada == "Baja") {

        tempBajaInicio = moment({ month: arrayini[1], day: arrayini[0] });
        tempBajaFin = moment({ month: arrayfin[1], day: arrayfin[0] });
        if (!tempBajaInicio.isBefore(tempBajaFin)) {
          let fechaActual = new Date()
          tempBajaInicio = moment({ year: fechaActual.getFullYear(), month: arrayini[1], day: arrayini[0] });
          tempBajaFin = moment({ year: fechaActual.getFullYear() + 1, month: arrayfin[1], day: arrayfin[0] });
        }
      } else if (this.precios[index].temporada == "Media") {
        tempMediaInicio = moment({ month: arrayini[1], day: arrayini[0] });
        tempMediaFin = moment({ month: arrayfin[1], day: arrayfin[0] });
      } else {

        tempAltaInicio = moment({ month: arrayini[1], day: arrayini[0] });
        tempAltaFin = moment({ month: arrayfin[1], day: arrayfin[0] });
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

  cancelarReserva(id:string){
    this.reservaService.cancelarReserva(id).subscribe(data =>{
      console.log(data);

    })
  }


  
  openModal(enterAnimationDuration: string, exitAnimationDuration: string, event :Event): void {
   
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


  valorarCamping(enterAnimationDuration: string, exitAnimationDuration: string, event :Event){
    const target = event.target as HTMLElement;
    const buttonId = target.id;


    this.dialogReValorar = this.dialog.open(ModalValorarCampingComponent, {
      width: '500px',
      height: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    this.dialogReValorar.afterClosed().subscribe((body) => {
      if (body.resultado == true) {
        this.reservaService.valorarReserva(buttonId, body.puntuacion).subscribe(data=>{
          console.log(data);
        })
      }
    });
  }


}
