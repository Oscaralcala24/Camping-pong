import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import * as L from 'leaflet';
import { Camping } from 'src/app/models/camping';
import { CampingService } from 'src/app/service/campingService/camping.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { ModalParcelasComponent } from '../modal-parcelas/modal-parcelas.component';



@Component({
  selector: 'app-agregar-camping',
  templateUrl: './agregar-camping.component.html',
  styleUrls: ['./agregar-camping.component.scss']
})
export class AgregarCampingComponent {

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
  ],"Aragón": [
    'Huesca',
    'Teruel',
    'Zaragoza'
  ],"Asturias": [
    'Asturias'
  ],"Baleares": [
    'Baleares'
  ],"Canarias": [
    'Las Palmas',
    'Santa Cruz de Tenerife'
  ],"Cantabria": [
    'Cantabria'
  ],"Castilla la Mancha": [
    'Albacete',
    'Ciudad Real',
    'Cuenca',
    'Guadalajara',
    'Toledo'
  ],"Castilla y León": [
    'Ávila',
    'Burgos',
    'León',
    'Palencia',
    'Salamanca',
    'Segovia',
    'Soria',
    'Valladolid',
    'Zamora'
  ],"Cataluña": [
    'Barcelona',
    'Girona',
    'Lleida',
    'Tarragona'
  ],"Ceuta": [
    'Ceuta'
  ],"Madrid": [
    'Madrid'
  ],"Comunidad Valenciana": [
    'Alicante',
    'Castellón',
    'Valencia'
  ],"Extremadura": [
    'Badajoz',
    'Cáceres'
  ],"Galicia": [
    'A Coruña',
    'Lugo',
    'Ourense',
    'Pontevedra'
  ],"La Rioja": [
    'La Rioja'
  ], "Melilla": [
    'Melilla'
  ],"Navarra": [
    'Navarra'
  ],"País Vasco": [
    'Álava',
    'Guipúzcoa',
    'Vizcaya'
  ],"Murcia": [
    'Murcia'
  ]
}
  imagenesArray:string [] = [];
  comunidadSeleccionada: string;
  dialogRef: MatDialogRef<ModalParcelasComponent>;
  rows: FormArray;
  parcelas:[] = [];
  serviciosPrincipales: any[] = [
    { nombre: 'Piscina', disponible: false },
    { nombre: 'Barbacoa', disponible: false  },
    { nombre: 'Supermercado', disponible: false},
    { nombre: 'Bar', disponible: false },
    { nombre: 'Wifi', disponible: false },
    { nombre: 'Gimnasio', disponible: false },
    { nombre: 'Se admiten mascotas', disponible: false },
    { nombre: 'Medico', disponible: false},
  ];
  serviciosSeleccionados:any[] =[];
  seviciosAgregados:any[] = [];


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.seviciosAgregados.push({nombre: value, disponible:true});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(servicio: any): void {
    const index = this.seviciosAgregados.indexOf(servicio);

    if (index >= 0) {
      this.seviciosAgregados.splice(index, 1);
    }
  }

  edit(servicio: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(servicio);
      return;
    }

    // Edit existing fruit
    const index = this.seviciosAgregados.indexOf(servicio);
    if (index >= 0) {
      this.seviciosAgregados[index].nombre = value;
    }
  }
 
  
 
  constructor(private fb: FormBuilder, private campingService: CampingService,private dialog: MatDialog, private router: Router) {
    this.reactiveForm()
  }

  imagenesChange(event) {
   
    for (var i = 0; i < event.target.files.length; i++) { 
        this.imagenesArray.push(event.target.files[i]);
    }
}
//--------------Formulario con control de errores---------------
  campingForm: FormGroup;
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
      arrayService: this.fb.array([{ nombre: 'Piscina', disponible: false },
      { nombre: 'Barbacoa', disponible: false  },
      { nombre: 'Supermercado', disponible: false},
      { nombre: 'Bar', disponible: false },
      { nombre: 'Wifi', disponible: false },
      { nombre: 'Gimnasio', disponible: false },
      { nombre: 'Se admiten mascotas', disponible: false },
      { nombre: 'Medico', disponible: false}]),
      
        });

        this.rows = this.fb.array([]);
  }
  // fechaTBajaInicio:Date;
  // fechaTBajaFin:Date;
  // fechaTMediaInicio:Date;
  // fechaTMediaFin:Date;
  // fechaTAltaInicio:Date;
  // fechaTAltaFin:Date;
  onCheckboxChange(event: any) {
    const formArray: FormArray = this.campingForm.get('arrayService') as FormArray;
    for (let index = 0; index < formArray.length; index++) {
      if (event.target.value == formArray.controls[index].value.nombre) {
        if(formArray.controls[index].value.disponible == false){
          formArray.controls[index].value.disponible = true;
          this.campingForm.patchValue({
            arrayService: formArray.value
          });
          
        }else{
          formArray.controls[index].value.disponible = false;
          this.campingForm.patchValue({
            arrayService: formArray.value
          });
        }
    }
  }
}

  public errorHandling = (control: string, error: string) => {
    return this.campingForm.controls[control].hasError(error);
  }



  ngOnInit() {
    this.campingForm.addControl('rows', this.rows);
  }
  //--------------MAPA---------------
    map: L.Map;
  marker: L.Marker;
  ngAfterViewInit() {
    this.map = L.map('map').setView([37.389, -5.992], 13);
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
  }

//--------------Agrega camping---------------
agregarCamping(){
  const formData = new FormData();
  console.log(this.campingForm.get('rows').value);
  console.log(this.campingForm.get('rows').value[0]);
  console.log(this.campingForm.get('rows').value[0].nombre);



  for (var i = 0; i < this.imagenesArray.length; i++) { 
    formData.append("imagenes", this.imagenesArray[i]);
  }

  formData.append('nombre', this.campingForm.get('nombre').value);
  formData.append('region', this.campingForm.get('region').value);
  formData.append('descripcion', this.campingForm.get('descripcion').value);
  formData.append('ciudad', this.campingForm.get('ciudad').value);
  formData.append('ubicacion', this.campingForm.get('ubicacion').value);
  formData.append('email', this.campingForm.get('email').value);
  formData.append('telefono', this.campingForm.get('telefono').value);
  formData.append('servicios',  JSON.stringify(this.campingForm.get('arrayService').value));
  console.log(this.parcelas);
  formData.append('parcelas', JSON.stringify(this.parcelas));
  formData.append('serviciosAdicional', JSON.stringify(this.seviciosAgregados));
  formData.append('precios',  JSON.stringify(this.campingForm.get('rows').value));
  formData.append('fechaTBajaInicio', this.campingForm.get('fechaTBajaInicio').value);
  formData.append('fechaTBajaFin', this.campingForm.get('fechaTBajaFin').value);
  formData.append('fechaTMediaInicio', this.campingForm.get('fechaTMediaInicio').value);
  formData.append('fechaTMediaFin', this.campingForm.get('fechaTMediaFin').value);
  formData.append('fechaTAltaInicio', this.campingForm.get('fechaTAltaInicio').value);
  formData.append('fechaTAltaFin', this.campingForm.get('fechaTAltaFin').value);

  this.campingService.addCamping(formData).subscribe(
    res => {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["admin/lista-camping"]));
    },
    err => {
      alert(err)
    },
  )

  
}


openModal(enterAnimationDuration: string, exitAnimationDuration: string, event :Event): void {
   
  const target = event.target as HTMLElement;
  
  // Obtener el ID del botón
  const buttonId = target.id;


  this.dialogRef = this.dialog.open(ModalParcelasComponent, {
    width: '90%',
    height: '90%',
    enterAnimationDuration,
    exitAnimationDuration,
  });

  this.dialogRef.afterClosed().subscribe(resultado =>{
    this.parcelas = resultado;
    
    
  })
  

}


onAddRow() {
  this.rows.push(this.createItemFormGroup());
  console.log(this.campingForm);
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
