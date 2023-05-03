import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CampingService } from 'src/app/service/campingService/camping.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor(private campingService: CampingService, private router: Router, public authService: AuthService) {}
  

  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.campingService.getCiudadesDisponibles().subscribe((data) => {
      for (let i = 0; i < data.consulta.length; i++){
        this.options.push(data.consulta[i].ciudad)
      }
    })
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  goCampingFilter(ciudad : string) { 
    
    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
      this.router.navigate(['/listado-camping'],{queryParams: { ciudad: ciudad}}).then(()=>{
      console.log(`After navigation I am on:${this.router.url}`)
      })
      })
    // this.router.navigate(
    //   ['/listado-camping'],
    //   { queryParams: { ciudad: ciudad} }
    // );

  }
  

}


