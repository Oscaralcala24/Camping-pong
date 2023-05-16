import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreciosService {
  private URL = "http://localhost:3000/precio/";
  constructor(private http:HttpClient , private router : Router ) { }


  getPrecios(id) : Observable<any>{
    return this.http.get(this.URL + id)
  }
}
