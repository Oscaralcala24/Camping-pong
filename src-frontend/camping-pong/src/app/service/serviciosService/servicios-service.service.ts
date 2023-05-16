import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosServiceService {
  private URL = "http://localhost:3000/servicio/";
  constructor(private http:HttpClient , private router : Router ) { }


  getServicios(id) : Observable<any>{
    return this.http.get(this.URL + id)
  }
}
