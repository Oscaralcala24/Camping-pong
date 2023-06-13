import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CampingService } from 'src/app/service/campingService/camping.service';
import { FilterPipe } from 'src/app/pipe/filter.pipe';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-lista-camping',
  templateUrl: './lista-camping.component.html',
  styleUrls: ['./lista-camping.component.scss']
})
export class ListaCampingComponent implements OnInit{
  constructor(private route: ActivatedRoute, private campingService : CampingService,private toastr: ToastrService){}
  p:Number = 1;
  ciudadActual:string = "";
  query:any = {};
  campings: any[] = [];
  campingsFiltrados: any[] = [];
  filterValues = {
    Piscina: false,
    Barbacoa: false,
    Supermercado: false,
    Bar: false,
    Wifi: false,
    Gimnasio: false,
    Mascotas: false,
    Medico: false,
  };
  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.ciudadActual = params['ciudad'];
        this.query = {
      ciudad : this.ciudadActual
      
    }
    this.campingService.getListaCamping(this.query).subscribe((data) =>{
      this.campings = data.filteredCamping;
      this.campingsFiltrados = this.campings
      console.log(this.campings);
    })
      }
    );
    
   
  }

  updateQueryParams(){
    let filterValuesAux = {};
    for (let servicio in this.filterValues) {
      if (this.filterValues[servicio] === true) {
        filterValuesAux[servicio] = true;
      }
  }

    this.campingsFiltrados = this.campings.filter(camping => {
   
      for (let index = 0; index < camping.servicios_disponibles.length; index++) {
        for (let servicio in filterValuesAux) {
          if (servicio == camping.servicios_disponibles[index].nombre && filterValuesAux[servicio] != camping.servicios_disponibles[index].disponible){
            return false
          }
          
      }
        
      }
      return true;
    });
  }
  
}
