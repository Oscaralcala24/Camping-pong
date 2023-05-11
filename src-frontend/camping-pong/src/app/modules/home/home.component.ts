import { Component, OnInit } from '@angular/core';
import { CampingService } from 'src/app/service/campingService/camping.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private campingService : CampingService){}
  campings: any[] = [];
  imagenPrincipal:string;

  ngOnInit(): void {
    this.campingService.getMejoresCamping().subscribe((data) =>{
      this.campings = data.consulta;
      console.log(this.campings);
      this.imagenPrincipal = this.campings[0].imagenes[0];
      console.log(this.imagenPrincipal);
    })

  }
  
}
