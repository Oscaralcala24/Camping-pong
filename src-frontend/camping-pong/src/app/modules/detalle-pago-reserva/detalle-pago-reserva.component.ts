import { Component, OnInit } from '@angular/core';
import { Camping } from 'src/app/models/camping';
import { CampingService } from 'src/app/service/campingService/camping.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PreciosService } from 'src/app/service/preciosService/precios.service';
import { ReservaService } from 'src/app/service/reservaService/reserva.service';
import * as moment from 'moment';
import { of } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/userService/user.service';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-detalle-pago-reserva',
  templateUrl: './detalle-pago-reserva.component.html',
  styleUrls: ['./detalle-pago-reserva.component.scss']
})
export class DetallePagoReservaComponent implements OnInit {
   camping: Camping;
   precios: any;
   reserva: any;
   fechaEntrada:any;
   fechaSalida:any;
   parcelaElegida:any;
   fechaEntradaAux:any;
   fechaSalidaAux:any;
   TBajaFechaInicio;
   tempBajaInicio;
   tempBajaFin;
   tempMediaInicio;
   tempMediaFin;
   tempAltaInicio;
   tempAltaFin;
   datosAux= [];
   sumatotal=0;
   reservaForm: FormGroup;
   user:User;
   
   constructor(private _snackBar: MatSnackBar,private campingService:CampingService,private preciosService:PreciosService,private reservaService: ReservaService, private route:ActivatedRoute, private router:Router, private fb:FormBuilder, private userService:UserService){
     
     this.reservaForm = this.fb.group({
      ntarjeta: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{15,16}$")]),
      fexpiracion: new FormControl(''),
      cvv: new FormControl('', [Validators.pattern('^[0-9]{3,3}$'), Validators.required]),
      titular: new FormControl('', [Validators.pattern("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{1,}$"),Validators.required]), 
    });
    }



  ngOnInit(): void {
    
    this.campingService.dataCamping.subscribe(data => {
      this.camping = data

    });

    this.preciosService.dataprecios.subscribe(data => {
      this.precios = data
      for (let index = 0; index < this.precios.length; index++) {
        let arrayini;
        let arrayfin;
        arrayini = this.precios[index].fecha_inicio.split("/")
        arrayfin = this.precios[index].fecha_fin.split("/")
        if(this.precios[index].temporada == "Baja"){
          
           this.tempBajaInicio = moment({ month: arrayini[1], day: arrayini[0] });
           this.tempBajaFin = moment({ month: arrayfin[1], day: arrayfin[0] });
           if(!this.tempBajaInicio.isBefore(this.tempBajaFin)){
            let fechaActual = new Date()
            this.tempBajaInicio = moment({year:fechaActual.getFullYear(), month: arrayini[1], day: arrayini[0] });
            this.tempBajaFin = moment({year:fechaActual.getFullYear()+1, month: arrayfin[1], day: arrayfin[0] });
           }
        }else if(this.precios[index].temporada == "Media"){
          this.tempMediaInicio = moment({ month: arrayini[1], day: arrayini[0] });
          this.tempMediaFin = moment({ month: arrayfin[1], day: arrayfin[0] });
        }else{

          this.tempAltaInicio = moment({ month: arrayini[1], day: arrayini[0] });
          this.tempAltaFin = moment({ month: arrayfin[1], day: arrayfin[0] });
        }
        
      }

    });

    this.reservaService.dataReserva.subscribe(data => {
      this.reserva = data
      console.log(this.reserva);
      this.parcelaElegida = this.reserva.id_parcela;
      let fechaIni = new Date(this.reserva.fecha_entrada)
      let fechaFin = new Date(this.reserva.fecha_salida)
      this.fechaEntradaAux = fechaIni.getDate()+"/"+(fechaIni.getMonth()+1)+"/"+fechaIni.getFullYear()
      this.fechaSalidaAux = fechaFin.getDate()+"/"+(fechaFin.getMonth()+1)+"/"+fechaFin.getFullYear()
      this.fechaEntrada = moment(fechaIni.getFullYear()+"-"+(fechaIni.getMonth()+1)+"-"+fechaIni.getDate(), 'YYYY-MM-DD'); 
       this.fechaSalida = moment(fechaFin.getFullYear()+"-"+(fechaFin.getMonth()+1)+"-"+fechaFin.getDate(), 'YYYY-MM-DD');
       
    });
    
    const noches = this.calcularNochesPorTemporada(this.fechaEntrada, this.fechaSalida);

  
    if(noches.Baja > 0){
      this.datosAux.push({temporada: "Baja", cantidadNoches: noches.Baja, precios:[]});
    }
    if(noches.Media > 0){
      this.datosAux.push({temporada: "Media", cantidadNoches: noches.Media, precios:[]});
      
    }
    if(noches.Alta > 0){
      this.datosAux.push({temporada: "Alta", cantidadNoches: noches.Alta, precios:[]});
    }
    

    var contador= 0;
    this.precios.forEach(element => {
      for (let j = 0; j < this.datosAux.length; j++) {
        
        if(element.temporada == this.datosAux[j].temporada){
          this.reserva.detalleReserva.forEach(k =>{
            element.detalle_precio.forEach(precios =>{
              console.log(k.cantidad);
              if(k.nombre == precios.nombre && k.cantidad>0){
                this.sumatotal += k.cantidad*precios.precio*this.datosAux[j].cantidadNoches;
                this.datosAux[j].precios.push({nombre: k.nombre, cantidad: k.cantidad, precio:precios.precio})
              }
            })
          })
        }
      }
    });
    console.log(this.datosAux);
    this.userService.dataUser.subscribe(user=>{
      this.user = user;
      console.log(this.user);
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
    
    // const tempBajaInicio = moment({ month: 8, day: 15 });
    // const tempBajaFin = moment({ month: 0, day: 15 });
    // const tempMediaInicio = moment({ month: 0, day: 16 });
    // const tempMediaFin = moment({ month: 5, day: 15 });
  
    if (fecha.isBetween(this.tempBajaInicio, this.tempBajaFin, null, '[]')) {
      return 'Baja';
    } else if (fecha.isBetween(this.tempMediaInicio, this.tempMediaFin, null, '[]')) {
      return 'Media';
    } else {
      return 'Alta';
    }
  }

  reservar(){

    let reserva = {
      id_camping: this.camping._id,
      id_usuario: this.user._id,
      id_parcela: this.parcelaElegida,
      fecha_entrada : new Date(this.fechaEntrada),
      fecha_salida : new Date(this.fechaSalida),
      detalleReserva : this.reserva.detalleReserva
    }
    console.log(reserva);
    this.reservaService.addReserva(reserva).subscribe((data)=>{
      this._snackBar.open(data, "Aceptar");    
      this.router.navigate(["/"])
    })

  }
}
