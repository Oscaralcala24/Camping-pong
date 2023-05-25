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
    console.log(Reserva)
    return this.http.post<FormData>(this.URL + 'addReserva', Reserva);
  }
  getReservas() : Observable<any>{
    return this.http.get<any>(this.URL + 'getReservas');
  }
  deleteReserva(id_reserva:string) : Observable<any>{
    return this.http.delete<any>(this.URL + 'deleteReserva/'+id_reserva);
  }

  get dataReserva() : Observable<any>{
    return this.reservaobj$.asObservable();
  }

  setDataReserva(reserva:any) : void{
    this.reservaobj$.next(reserva);
  }
}
