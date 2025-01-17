import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import * as L from 'leaflet';
import { CampingService } from 'src/app/service/campingService/camping.service';
import { ServiciosServiceService } from 'src/app/service/serviciosService/servicios-service.service';
import { PreciosService } from 'src/app/service/preciosService/precios.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ParcelaService } from 'src/app/service/parcelaService/parcela.service';
import { UserService } from 'src/app/service/userService/user.service';
import { ReservaService } from 'src/app/service/reservaService/reserva.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-informacion-camping',
  templateUrl: './informacion-camping.component.html',
  styleUrls: ['./informacion-camping.component.scss']
})
export class InformacionCampingComponent {
  constructor(private _snackBar: MatSnackBar,private reservaService: ReservaService, private userService: UserService, private router: Router, private route: ActivatedRoute,
    private campingService: CampingService, private serviciosService: ServiciosServiceService,
    private preciosService: PreciosService, private fb: FormBuilder, private parcelaService: ParcelaService,private gallery: Gallery,private authService:AuthService,private toastr: ToastrService) { }
  reservaForm: FormGroup;
  idCamping: string;
  camping: any;
  parcelas: any;
  precios: any = [];
  preciosBaja: any = [];
  preciosMedia: any = [];
  preciosAlta: any = [];
  coordenadas: any = [];
  images: GalleryItem[] = [];
  servicios: any;
  plano: string;
  valores: any = [];
  fechaEntrada: Date;
  fechaSalida: Date;
  reserva: any;
  minDate = new Date();
  map: L.Map;
  marker: L.Marker;
  parcelaElegida:any;
  @ViewChildren("areaElement") areaElement: QueryList<ElementRef>;



  galleryRef = this.gallery.ref('myGallery');

  ngOnInit(): void {


    this.route.params
      .subscribe(params => {
        this.idCamping = params['id']
        
      }
      );
    this.campingService.getCamping(this.idCamping).subscribe((data) => {
      this.camping = data.consulta;
      this.campingService.setCampingdata(this.camping)
      
      let auxCoords = this.camping.ubicacion.split(",");
      let x = auxCoords[0].split(" ");
      let y = auxCoords[1].split(" ");
      let marcador = {
        lat: x[1],
        lng: y[2]
      }
      this.map = L.map('map').setView([x[1], y[2]], 10);
      this.marker = L.marker(marcador).addTo(this.map);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);

      for (let index = 0; index < this.camping.imagenes.length; index++) {
        this.galleryRef.addImage({ src: this.camping.imagenes[index], thumb: this.camping.imagenes[index] });
        
        
        if (this.camping.imagenes[index].includes("plano")) {
          this.plano = this.camping.imagenes[index]
        }
      }
    })
    this.serviciosService.getServicios(this.idCamping).subscribe((data) => {
      this.servicios = data.consulta;
      
    })

    this.preciosService.getPrecios(this.idCamping).subscribe((data) => {

      for (let index = 0; index < data.consulta.length; index++) {
        let fechaIni = new Date(data.consulta[index].fecha_inicio)
        let fechaFin = new Date(data.consulta[index].fecha_fin)
        this.precios.push({
          temporada: data.consulta[index].temporada,
          fecha_inicio: fechaIni.getDate() + '/' + (fechaIni.getMonth()+1),
          fecha_fin: fechaFin.getDate() + '/' + (fechaFin.getMonth()+1),
          detalle_precio: data.consulta[index].detalle_precio
        })
      }
      for (let index = 0; index < this.precios.length; index++) {
        if (this.precios[index].temporada === "Baja") {
          this.preciosBaja = this.precios[index].detalle_precio
        } else if (this.precios[index].temporada === "Media") {
          this.preciosMedia = this.precios[index].detalle_precio
        } else {
          this.preciosAlta = this.precios[index].detalle_precio
        }

      }
      for (let index = 0; index < this.preciosBaja.length; index++) {
        if (this.preciosBaja[index].nombre === "Parcela") {
          this.valores.push({
            nombre: this.preciosBaja[index].nombre,
            cantidad: 1
          })
        } else {
          this.valores.push({
            nombre: this.preciosBaja[index].nombre,
            cantidad: 0
          })

        }

      }

    })
    this.parcelaService.getParcelas(this.idCamping).subscribe((data) => {
      this.parcelas = data.consulta
      
      for (let i = 0; i < this.parcelas.length; i++) {
        var auxCoords = {
          id: this.parcelas[i]._id,
          id_camping: this.parcelas[i].id_camping,
          coordenadas: [],
          tamano: this.parcelas[i].tamano
        }
        for (let j = 0; j < this.parcelas[i].coordenadas.length; j++) {
          auxCoords.coordenadas.push(this.parcelas[i].coordenadas[j].x)
          auxCoords.coordenadas.push(this.parcelas[i].coordenadas[j].y)

        }
        this.coordenadas.push(auxCoords)
      }
      this.redimensionar();

      console.log(this.coordenadas);
    })






  }




  redimensionar() {
    var areas = [];
    this.areaElement.changes.subscribe(a => a.forEach((b, i) => areas.push(b.nativeElement)));
    

      var ImageMap = function (map, img,width) {

        var n;
        var len = areas.length;
        var coords = []
        var previousWidth = width;

        for (n = 0; n < len; n++) {
          coords[n] = areas[n].coords.split(',');

        }

        this.resize = function () {
          var n, m, clen,
            x = img.offsetWidth / previousWidth;
          for (n = 0; n < len; n++) {
            clen = coords[n].length;
            for (m = 0; m < clen; m++) {
              coords[n][m] *= x;
            }
            areas[n].coords = coords[n].join(',');
          }
          previousWidth = document.body.clientWidth;
          return true;
        };
        window.onresize = this.resize;
      }
      var width
      let img = document.getElementById('img_ID') as HTMLImageElement;

      let foto = new Image();
      foto.src = img.src;
      foto.onload = () => {
        width = foto.width;

        var imageMap = new ImageMap(document.getElementById('map_ID'), document.getElementById('img_ID'),width);
        imageMap.resize();
      }






  }

  detalleReserva() {
    if (!this.authService.loggedIn()){
      this.toastr.warning("Debes iniciar sesión")
      this.router.navigateByUrl('/login')
      // this.router.navigate(['/login']);
    }
    this.userService.dataUser.subscribe((data) => {
      this.reserva = ({
        id_camping: this.idCamping,
        id_usuario: data._id,
        id_parcela: this.parcelaElegida,
        fecha_entrada: this.fechaEntrada,
        fecha_salida: this.fechaSalida,
        detalleReserva:this.valores
      })
      this.campingService.setCampingdata(this.camping)
      this.reservaService.setDataReserva(this.reserva)
      this.preciosService.setDataPrecios(this.precios)
      this.router.navigate(['/detallePago']);
    })
  }

  comprobarParcela(event) {
    const target = event.target as HTMLElement;
    
    // Obtener el ID del botón
    const buttonId = target.id;
    
    
    let reserva = {
      id_parcela: buttonId,
      fechaIni: this.fechaEntrada,
      fechaFin: this.fechaSalida
    }
  
    if(this.fechaEntrada && this.fechaSalida){
      
      this.reservaService.checkReserva(reserva).subscribe(data=>{
        
        
        if(data == "Parcela seleccionada correctamente"){
          this.toastr.success(data)
          this.parcelaElegida = buttonId
        }else{
          this.toastr.warning(data)
        }

      })

    }else{
      this.toastr.warning("Debes seleccionar una fecha de entrada y salida")
    }
  }


}
