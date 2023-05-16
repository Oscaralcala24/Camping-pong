import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, ImageItem } from 'ng-gallery';
import * as L from 'leaflet';
import { CampingService } from 'src/app/service/campingService/camping.service';
import { ServiciosServiceService } from 'src/app/service/serviciosService/servicios-service.service';
import { PreciosService } from 'src/app/service/preciosService/precios.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ParcelaService } from 'src/app/service/parcelaService/parcela.service';

@Component({
  selector: 'app-informacion-camping',
  templateUrl: './informacion-camping.component.html',
  styleUrls: ['./informacion-camping.component.scss']
})
export class InformacionCampingComponent {
constructor(private route : ActivatedRoute , private campingService: CampingService, private serviciosService: ServiciosServiceService , private preciosService: PreciosService, private fb: FormBuilder,private parcelaService: ParcelaService){}
reservaForm: FormGroup;
idCamping:string;
camping:any;
parcelas:any;
precios:any=[];
preciosBaja:any=[];
preciosMedia:any=[];
preciosAlta:any=[];
coordenadas:any=[];
images: GalleryItem[] = [];
servicios:any;
plano:string;
valores:any = [];
fechaEntrada:Date;
fechaSalida:Date;
ngOnInit(): void {
  

  this.route.params
    .subscribe(params => {
      this.idCamping = params['id']
      console.log(params['id']); // { orderby: "price" }
    }
  );
  this.campingService.getCamping(this.idCamping).subscribe((data) =>{
    this.camping = data.consulta;
    console.log(this.camping);

    for (let index = 0; index < this.camping.imagenes.length; index++) {
      this.images.push(new ImageItem({ src:this.camping.imagenes[index] , thumb:this.camping.imagenes[index] }));
      console.log(this.camping.imagenes[index]);
      if(this.camping.imagenes[index].includes("plano")){
        this.plano = this.camping.imagenes[index]
      }
    }
  })
  this.serviciosService.getServicios(this.idCamping).subscribe((data) =>{
    this.servicios = data.consulta;
    console.log(this.servicios.servicios_disponibles);
    console.log(this.servicios.servicios_disponibles[0].nombre);
  })

  this.preciosService.getPrecios(this.idCamping).subscribe((data) =>{
    
    for (let index = 0; index < data.consulta.length; index++) {
      let fechaIni = new Date(data.consulta[index].fecha_inicio)
      let fechaFin = new Date(data.consulta[index].fecha_fin)
      this.precios.push({
        temporada: data.consulta[index].temporada,
        fecha_inicio: fechaIni.getDate() + '/' + fechaIni.getMonth(),
        fecha_fin: fechaFin.getDate() + '/' + fechaFin.getMonth(),
        detalle_precio: data.consulta[index].detalle_precio
      })
    }
    for (let index = 0; index < this.precios.length; index++) {
      if(this.precios[index].temporada === "Baja"){
        this.preciosBaja = this.precios[index].detalle_precio
      }else if(this.precios[index].temporada === "Media"){
        this.preciosMedia = this.precios[index].detalle_precio
      }else{
        this.preciosAlta = this.precios[index].detalle_precio
      }
      
    }
    for (let index = 0; index < this.preciosBaja.length; index++) {
      this.valores.push({
        nombre: this.preciosBaja[index].nombre,
        cantidad: 0
      })
      
    }

  })
  this.parcelaService.getParcelas(this.idCamping).subscribe((data) => {
    this.parcelas = data.consulta
    for (let i = 0; i < this.parcelas.length; i++) {
      var auxCoords = {
        id: this.parcelas[i].id,
        id_camping: this.parcelas[i].id_camping,
        coordenadas:[]
      }
      for (let j = 0; j < this.parcelas[i].coordenadas.length; j++) {
        auxCoords.coordenadas.push(this.parcelas[i].coordenadas[j].x)
        auxCoords.coordenadas.push(this.parcelas[i].coordenadas[j].y)
        
      }
      this.coordenadas.push(auxCoords)
    }
    console.log(this.coordenadas[0].coordenadas.toString());
  })
}




map: L.Map;
marker: L.Marker;
ngAfterViewInit() {
  
  let auxCoords = this.camping.ubicacion.split(","); 
  let x = auxCoords[0].split(" ");
  let y = auxCoords[1].split(" ");
  let marcador ={
    lat: x[1],
    lng: y[2]
}
  this.map = L.map('map').setView([x[1], y[2]],10);
  this.marker = L.marker(marcador).addTo(this.map);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(this.map);
 
}

}
