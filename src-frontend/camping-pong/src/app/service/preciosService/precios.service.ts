import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreciosService {
  private preciosobj$ = new BehaviorSubject<any>(null);
  private URL = "http://localhost:3000/precio/";
  constructor(private http:HttpClient , private router : Router ) { }


  getPrecios(id) : Observable<any>{
    return this.http.get(this.URL + id)
  }

  get dataprecios() : Observable<any>{
    return this.preciosobj$.asObservable();
  }

  setDataPrecios(precios:any) : void{
    this.preciosobj$.next(precios);
  }
}
