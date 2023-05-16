import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParcelaService {
  private URL = "http://localhost:3000/parcela/";
  constructor(private http:HttpClient , private router : Router ) { }


  getParcelas(id) : Observable<any>{
    return this.http.get(this.URL + id)
  }
}
