import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private reservaobj$ = new BehaviorSubject<any>(null);
  private URL = "http://localhost:3000/reserva/";
  constructor(private http:HttpClient , private router : Router ) { }

  addReserva(Reserva:any) : Observable<any>{
    return this.http.post<any>(this.URL + 'anadirReserva', Reserva);
  }
  getReservas() : Observable<any>{
    return this.http.get<any>(this.URL + 'getReservas');
  }
  checkReserva(reserva) : Observable<any>{
    return this.http.post<any>(this.URL + 'checkReserva',reserva);
  }
  cancelarReserva(id_reserva:string) : Observable<any>{
    let body = {estado:"Cancelado"} 
    return this.http.put<any>(this.URL + 'cancelarReserva/'+id_reserva, body);
  }
  valorarReserva(id_reserva:string, valoracion) : Observable<any>{
    let body = {valoracion:valoracion} 
    return this.http.put<any>(this.URL + 'valorar/'+id_reserva, body);
  }

  get dataReserva() : Observable<any>{
    return this.reservaobj$.asObservable();
  }

  setDataReserva(reserva:any) : void{
    this.reservaobj$.next(reserva);
  }
}
