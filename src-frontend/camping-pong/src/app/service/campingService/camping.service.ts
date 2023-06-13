import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Camping } from 'src/app/models/camping';
@Injectable({
  providedIn: 'root'
})
export class CampingService {
  private URL = "http://localhost:3000/camping/";
  private campingobj$ = new BehaviorSubject<Camping>(null);
  constructor(private http:HttpClient , private router : Router ) { }

  getCamping(id) : Observable<any>{
    return this.http.get(this.URL + id)
  }
  getListaCamping(queryParams) : Observable<any>{
    console.log(queryParams);
    
    return this.http.get<any>(this.URL + 'listaCampings',{params:queryParams})
  }
  getMejoresCamping() : Observable<any>{
    return this.http.get<any>(this.URL + 'mejoresCamping')
  }
  getCiudadesDisponibles() : Observable<any>{
    return this.http.get<any>(this.URL + 'ciudadesDisponibles')
  }

  get dataCamping() : Observable<Camping>{
    return this.campingobj$.asObservable();
  }

  setCampingdata(camping:Camping) : void{
    this.campingobj$.next(camping);
  }
  deleteCamping(id:string) : Observable<Camping>{
    return this.http.delete<any>(this.URL + 'borrar/'+id);
  }

  addCamping(Camping:FormData) : Observable<any>{
    console.log(Camping)
    return this.http.post<FormData>(this.URL + 'agregarCamping', Camping);
  }
  
  modificarCamping(Camping:any, id:string) : Observable<any>{
    return this.http.put<any>(this.URL + 'modificarCamping/'+ id, Camping);
  }
}
