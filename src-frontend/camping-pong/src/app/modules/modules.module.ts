import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro/registro.component';
import { CoreModule } from '../core/core.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { HomeComponent } from './home/home.component';
import { FilterPipe } from '../pipe/filter.pipe';
import { FilterUserPipe } from '../pipe/filter-user.pipe';
import { ListaCampingComponent } from './lista-camping/lista-camping.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ListaUsuariosAdminComponent } from './lista-usuarios-admin/lista-usuarios-admin.component';
import { AppRoutingModule } from '../app-routing.module';
import { ListaCampingAdminComponent } from './lista-camping-admin/lista-camping-admin.component';
import { IngresosCampingComponent } from './ingresos-camping/ingresos-camping.component';
import { ModalborrarcampingComponent } from './modalborrarcamping/modalborrarcamping.component';
import { ModalBorrarusuarioComponent } from './modal-borrarusuario/modal-borrarusuario.component';
import { ModalGenerarPasswordComponent } from './modal-generar-password/modal-generar-password.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgregarCampingComponent } from './agregar-camping/agregar-camping.component';
import { ModalParcelasComponent } from './modal-parcelas/modal-parcelas.component';
import { ModificarUsuarioAdminComponent } from './modificar-usuario-admin/modificar-usuario-admin.component';
import { MatNativeDateModule } from '@angular/material/core';
import { InformacionCampingComponent } from './informacion-camping/informacion-camping.component';
import { ModificarCampingComponent } from './modificar-camping/modificar-camping.component';
import { GalleryModule } from  'ng-gallery';
@NgModule({
  declarations: [
    RegistroComponent,
    LoginComponent,
    LoginAdminComponent,
    DashboardAdminComponent,
    HomeComponent,
    ListaCampingComponent,
    PerfilComponent,
    ListaUsuariosAdminComponent,
    ListaCampingAdminComponent,
    IngresosCampingComponent,
    FilterPipe,
    ModalborrarcampingComponent,
    ModalBorrarusuarioComponent,
    FilterUserPipe,
    ModalGenerarPasswordComponent,
    AgregarCampingComponent,
    ModalParcelasComponent,
    ModificarUsuarioAdminComponent,
    InformacionCampingComponent,
    ModificarCampingComponent,
    
  ],
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    MatNativeDateModule,
    GalleryModule,
  

    
  ], 

})
export class ModulesModule { }
