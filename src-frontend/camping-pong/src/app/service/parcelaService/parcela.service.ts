import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParcelaService {
  private parcelaobj$ = new BehaviorSubject<any>(null);
  private URL = "http://localhost:3000/parcela/";
  constructor(private http:HttpClient , private router : Router ) { }


  getParcelas(id) : Observable<any>{
    return this.http.get(this.URL + id)
  }

  get dataParcela() : Observable<any>{
    return this.parcelaobj$.asObservable();
  }

  setDataParcela(parcela:any) : void{
    this.parcelaobj$.next(parcela);
  }
}
