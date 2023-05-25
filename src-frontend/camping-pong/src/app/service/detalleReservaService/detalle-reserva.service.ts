import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleReservaService {


  private URL = "http://localhost:3000/detalleReserva/";
  constructor(private http:HttpClient , private router : Router ) { }


  getDetalleReserva(id_usuario) : Observable<any>{
    return this.http.get<any>(this.URL + 'getReservas/'+id_usuario);
  }

}
