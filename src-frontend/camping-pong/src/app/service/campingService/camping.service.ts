import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampingService {
  private URL = "http://localhost:3000/camping/";

  constructor(private http:HttpClient , private router : Router ) { }

  getCamping(id) : Observable<any>{
    return this.http.get(this.URL + id)
  }
  getAllCamping() : Observable<any>{
    return this.http.get<any>(this.URL + '/allcamping')
  }
}
