import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CampingService } from 'src/app/service/campingService/camping.service';
@Component({
  selector: 'app-lista-camping',
  templateUrl: './lista-camping.component.html',
  styleUrls: ['./lista-camping.component.scss']
})
export class ListaCampingComponent implements OnInit{
  constructor(private route: ActivatedRoute, private campingService : CampingService){}
  ciudadActual:string = "";
  query:any = {};
  campings: any[] = [];
  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
 // { orderby: "price" }
        this.ciudadActual = params['ciudad'];
         
        // price
        this.query = {
      ciudad : this.ciudadActual
      
    }
    this.campingService.getListaCamping(this.query).subscribe((data) =>{
      this.campings = data.filteredCamping;
    })
      }
    );
    
   
  }
  
}
