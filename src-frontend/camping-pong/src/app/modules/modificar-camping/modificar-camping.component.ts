import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Camping } from 'src/app/models/camping';
import { CampingService } from 'src/app/service/campingService/camping.service';
import { PreciosService } from 'src/app/service/preciosService/precios.service';
import * as L from 'leaflet';
@Component({
  selector: 'app-modificar-camping',
  templateUrl: './modificar-camping.component.html',
  styleUrls: ['./modificar-camping.component.scss']
})
export class ModificarCampingComponent {
  constructor(private route: ActivatedRoute, private campingService: CampingService, private preciosService: PreciosService
    , private router: Router, private toastr: ToastrService, private fb: FormBuilder) {
    this.reactiveForm()
  }
  regiones = ["Andalucia", "Aragón", "Canarias", "Cantabria", "Castilla y León", "Castilla la Mancha", "Cataluña", "Ceuta", "Comunidad Valenciana",
    "Madrid", "Extremadura", "Galicia", "Baleares", "La Rioja", "Melilla", "Navarra", "País Vasco", "Asturias", "Murcia"]
  ciudades = {
    "Andalucia": [
      'Almería',
      'Cádiz',
      'Córdoba',
      'Granada',
      'Huelva',
      'Jaén',
      'Málaga',
      'Sevilla'
    ], "Aragón": [
      'Huesca',
      'Teruel',
      'Zaragoza'
    ], "Asturias": [
      'Asturias'
    ], "Baleares": [
      'Baleares'
    ], "Canarias": [
      'Las Palmas',
      'Santa Cruz de Tenerife'
    ], "Cantabria": [
      'Cantabria'
    ], "Castilla la Mancha": [
      'Albacete',
      'Ciudad Real',
      'Cuenca',
      'Guadalajara',
      'Toledo'
    ], "Castilla y León": [
      'Ávila',
      'Burgos',
      'León',
      'Palencia',
      'Salamanca',
      'Segovia',
      'Soria',
      'Valladolid',
      'Zamora'
    ], "Cataluña": [
      'Barcelona',
      'Girona',
      'Lleida',
      'Tarragona'
    ], "Ceuta": [
      'Ceuta'
    ], "Madrid": [
      'Madrid'
    ], "Comunidad Valenciana": [
      'Alicante',
      'Castellón',
      'Valencia'
    ], "Extremadura": [
      'Badajoz',
      'Cáceres'
    ], "Galicia": [
      'A Coruña',
      'Lugo',
      'Ourense',
      'Pontevedra'
    ], "La Rioja": [
      'La Rioja'
    ], "Melilla": [
      'Melilla'
    ], "Navarra": [
      'Navarra'
    ], "País Vasco": [
      'Álava',
      'Guipúzcoa',
      'Vizcaya'
    ], "Murcia": [
      'Murcia'
    ]
  }
  campingForm: FormGroup;
  camping: Camping;
  idCamping: string;
  comunidadSeleccionada: string;
  ciudadSeleccionada: string;
  precios: any;
  fechaTBajaInicio
  fechaTBajaFin
  fechaTMediaFin
  fechaTMediaInicio
  fechaTAltaInicio
  fechaTAltaFin
  map: L.Map;
  marker: L.Marker;
  rows: FormArray;
 

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.idCamping = params['id']
      }
      );
    console.log(this.idCamping);
    this.campingService.getCamping(this.idCamping).subscribe(data => {
      this.camping = data.consulta; 
      console.log(this.camping);

      let auxCoords = this.camping.ubicacion.split(",");
      let x = auxCoords[0].split(" ")
      let y = auxCoords[1].split(" ");
      let marcador = {
        lat: Number(x[1]),
        lng: Number(y[2])
      }
      

    this.map = L.map('map').setView([marcador.lat, marcador.lng], 13);
    this.marker = L.marker(marcador).addTo(this.map);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    this.map.on('click', (e) => {
      if (!this.marker) {

        this.marker = L.marker(e.latlng).addTo(this.map);
      } else {
        this.marker.setLatLng(e.latlng);
      }
      this.campingForm.controls['ubicacion'].setValue(`Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`);
    
    });




      console.log(this.camping);
      this.comunidadSeleccionada = this.camping.region.toString();
      this.ciudadSeleccionada = this.camping.ciudad.toString();
      this.preciosService.getPrecios(this.idCamping).subscribe(precios => {
        this.precios = precios.consulta
        for (let index = 0; index < this.precios.length; index++) {
          if(index == 0){
            for (let j = 0; j < this.precios[index].detalle_precio.length; j++) {
              this.onAddRow();
              
              
            }
          }
          if (this.precios[index].temporada == "Baja"){
            this.campingForm.get('fechaTBajaInicio').setValue(this.precios[index].fecha_inicio);
            this.campingForm.get('fechaTBajaFin').setValue(this.precios[index].fecha_fin);
          }else if (this.precios[index].temporada == "Media"){
            this.campingForm.get('fechaTMediaInicio').setValue(this.precios[index].fecha_inicio);
            this.campingForm.get('fechaTMediaFin').setValue(this.precios[index].fecha_fin);            
          }else{
            this.campingForm.get('fechaTAltaInicio').setValue(this.precios[index].fecha_inicio);
            this.campingForm.get('fechaTAltaFin').setValue(this.precios[index].fecha_fin);

          }
          
        }
        
        console.log(this.precios);
      })
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.campingForm.controls[control].hasError(error);
  }
  reactiveForm() {
    this.campingForm = this.fb.group({
      nombre: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{1,}$")]),
      descripcion: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
      ciudad: new FormControl('', [Validators.required]),
      ubicacion: new FormControl('', [Validators.required]),
      imagenes: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.pattern("^[0-9]{9}$"), Validators.required]),
      fechaTBajaInicio: ['', Validators.required],
      fechaTBajaFin: ['', Validators.required],
      fechaTMediaFin: ['', Validators.required],
      fechaTMediaInicio: ['', Validators.required],
      fechaTAltaInicio: ['', Validators.required],
      fechaTAltaFin: ['', Validators.required],
      // arrayService: this.fb.array([{ nombre: 'Piscina', disponible: false },
      // { nombre: 'Barbacoa', disponible: false  },
      // { nombre: 'Supermercado', disponible: false},
      // { nombre: 'Bar', disponible: false },
      // { nombre: 'Wifi', disponible: false },
      // { nombre: 'Gimnasio', disponible: false },
      // { nombre: 'Se admiten mascotas', disponible: false },
      // { nombre: 'Medico', disponible: false}]),

      //   });

    })
    this.rows = this.fb.array([]);


  }



  modificarCamping() {

  }


  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  
  }
  
  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
  }
  
  createItemFormGroup(): FormGroup {
    return this.fb.group({
      nombre: null,
      preciobaja: null,
      preciomedia: null,
      precioalta: null,
    });
  }
}