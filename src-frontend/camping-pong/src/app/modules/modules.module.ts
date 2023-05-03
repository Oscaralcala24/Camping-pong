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
import { ListaCampingComponent } from './lista-camping/lista-camping.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ListaUsuariosAdminComponent } from './lista-usuarios-admin/lista-usuarios-admin.component';
import { AppRoutingModule } from '../app-routing.module';
import { ListaCampingAdminComponent } from './lista-camping-admin/lista-camping-admin.component';
import { IngresosCampingComponent } from './ingresos-camping/ingresos-camping.component';
@NgModule({
  declarations: [
    RegistroComponent,
    LoginComponent,
    LoginAdminComponent,
    DashboardAdminComponent,
    HomeComponent,
    CardCampingComponent,
    ListaCampingComponent,
    PerfilComponent,
    ListaUsuariosAdminComponent,
    ListaCampingAdminComponent,
    IngresosCampingComponent,

  ],
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule
  ], 

})
export class ModulesModule { }
