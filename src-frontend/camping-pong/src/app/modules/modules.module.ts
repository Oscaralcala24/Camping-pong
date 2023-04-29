import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro/registro.component';
import { CoreModule } from '../core/core.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { HomeComponent } from './home/home.component';
import { CardCampingComponent } from './card-camping/card-camping.component';
@NgModule({
  declarations: [
    RegistroComponent,
    LoginComponent,
    LoginAdminComponent,
    DashboardAdminComponent,
    HomeComponent,
    CardCampingComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule
  ], 

})
export class ModulesModule { }
