import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/userService/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from 'src/app/service/reservaService/reserva.service';
import * as moment from 'moment';
import { CampingService } from 'src/app/service/campingService/camping.service';
import { PreciosService } from 'src/app/service/preciosService/precios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modificar-usuario-admin',
  templateUrl: './modificar-usuario-admin.component.html',
  styleUrls: ['./modificar-usuario-admin.component.scss']
})
export class ModificarUsuarioAdminComponent {
  user!: User
  disabled = true;
  updateDataForm: FormGroup;
  idUsuario: string;
  reservas: any = [];
  reservasAux: any=[];
  precios: any;
  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private reservaService: ReservaService, private campingService: CampingService, private preciosService: PreciosService
    , private router: Router,private toastr: ToastrService) {

    this.reactiveForm()
  }

  reactiveForm() {
    this.updateDataForm = this.fb.group({
      nombre: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{1,}$")]),
      apellidos: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{1,}$")]),
      dni: new FormControl('', [Validators.pattern('^[0-9]{8,8}[A-Za-z]$'), Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.pattern("^[0-9]{9}$"), Validators.required]),
    });
  }


  ngOnInit(): void {

    this.route.params
      .subscribe(params => {
        this.idUsuario = params['id']
      }
      );
    this.userService.getUsuario(this.idUsuario).subscribe((data) => {
      this.user = data.consulta;
    })


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
            console.log(noches);
            let datosAux= [];
    
            if(noches.Baja > 0){
              datosAux.push({temporada: "Baja", cantidadNoches: noches.Baja, precios:[]});
            }
            if(noches.Media > 0){
              datosAux.push({temporada: "Media", cantidadNoches: noches.Media, precios:[]});
              
            }
            if(noches.Alta > 0){
              datosAux.push({temporada: "Alta", cantidadNoches: noches.Alta, precios:[]});
            }

            var sumatotal = 0

            this.precios.forEach(element => {
              
              for (let j = 0; j < datosAux.length; j++) {
                if(element.temporada == datosAux[j].temporada){
                  for (let l = 0; l < this.reservas.length; l++) {
                    
                    this.reservas[l].detalle.forEach(precios =>{
                      element.detalle_precio.forEach(k=>{
                        console.log(datosAux[j].cantidadNoches);
                      if(k.nombre == precios.nombre && precios.cantidad>0){
                        sumatotal += precios.cantidad*k.precio*datosAux[j].cantidadNoches;
                        datosAux[j].precios.push({nombre: precios.nombre, cantidad: precios.cantidad, precio:k.precio})
                      }
                    })
                  })
                  }
                }
              }

            });
            this.reservasAux.push({
              nombre_camping: camping.nombre,
              fecha_pago: fechaPago.getDate() + "/" + (fechaPago.getMonth() + 1) + "/" + fechaPago.getFullYear(),
              fechaEntradaAux: fechaEntrada.getDate() + "/" + (fechaEntrada.getMonth() + 1) + "/" + fechaEntrada.getFullYear(),
              fechaSalidaAux: fechaSalida.getDate() + "/" + (fechaSalida.getMonth() + 1) + "/" + fechaSalida.getFullYear(),
              detalle: datosAux,
              sumatotal: sumatotal,
              imagen: camping.imagenes[0],
              estado: element.id_reserva.estado
            })
            console.log(this.reservasAux);

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
        this.toastr.success(res)
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(["/admin/lista-usuarios/modificar/"+this.idUsuario]));
      },
      err => {
        this.toastr.success(err)
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(["/admin/lista-usuarios/modificar/"+this.idUsuario]));
      },
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
      let fechaAuxIn = new Date(arrayini[0])
      let fechaAuxOut = new Date(arrayfin[0])


      if (this.precios[index].temporada == "Baja") {

        tempBajaInicio = moment({ month: fechaAuxIn.getMonth()+1, day: fechaAuxIn.getDate() });
        tempBajaFin = moment({ month: fechaAuxOut.getMonth()+1, day: fechaAuxOut.getDate() });
        if (!tempBajaInicio.isBefore(tempBajaFin)) {
          let fechaActual = new Date()
          tempBajaInicio = moment({ year: fechaActual.getFullYear(), month: fechaAuxIn.getMonth()+1, day: fechaAuxIn.getDate() });
          tempBajaFin = moment({ year: fechaActual.getFullYear() + 1, month: fechaAuxOut.getMonth()+1, day: fechaAuxOut.getDate() });
        }
      } else if (this.precios[index].temporada == "Media") {
        tempMediaInicio = moment({ month: fechaAuxIn.getMonth()+1, day: fechaAuxIn.getDate() });
        tempMediaFin = moment({ month: fechaAuxOut.getMonth()+1, day: fechaAuxOut.getDate() });
      } else {

        tempAltaInicio = moment({ month: fechaAuxIn.getMonth()+1, day: fechaAuxIn.getDate() });
        tempAltaFin = moment({ month: fechaAuxOut.getMonth()+1, day: fechaAuxOut.getDate() });
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


}
