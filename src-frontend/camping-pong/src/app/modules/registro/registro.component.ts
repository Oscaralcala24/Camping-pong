import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit{
  constructor(){ }

  ngOnInit():void {
    console.log("En este instante el componente ha cargado")
  }
}
