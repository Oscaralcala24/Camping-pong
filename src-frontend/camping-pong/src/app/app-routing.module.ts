import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { RegistroComponent } from './modules/registro/registro.component';
import { LoginComponent } from './modules/login/login.component';
import { LoginAdminComponent } from './modules/login-admin/login-admin.component';
import { AuthGuard } from './guards/auth.guard';
import { RolGuard } from './guards/rol.guard';
import { AdminSkeletonComponent } from './layout/admin-skeleton/admin-skeleton.component';
import { DashboardAdminComponent } from './modules/dashboard-admin/dashboard-admin.component';
import { HomeComponent } from './modules/home/home.component';
import { ListaCampingComponent } from './modules/lista-camping/lista-camping.component';
import { PerfilComponent } from './modules/perfil/perfil.component';
import { ListaUsuariosAdminComponent } from './modules/lista-usuarios-admin/lista-usuarios-admin.component';
import { ListaCampingAdminComponent } from './modules/lista-camping-admin/lista-camping-admin.component';
import { IngresosCampingComponent } from './modules/ingresos-camping/ingresos-camping.component';
import { AgregarCampingComponent } from './modules/agregar-camping/agregar-camping.component';
import { ModificarUsuarioAdminComponent } from './modules/modificar-usuario-admin/modificar-usuario-admin.component';
import { ModificarCampingComponent } from './modules/modificar-camping/modificar-camping.component';
import { InformacionCampingComponent } from './modules/informacion-camping/informacion-camping.component';
//canActivate: [AuthGuard] Verifica si el usuario ue intenta entrar en la ruta tiene el token o no
const routes: Routes = [
  {
    path: '',
    component: SkeletonComponent,
    pathMatch: 'prefix',
    
    children: [
      { path: '', component:  HomeComponent },
      { path: 'registro', component: RegistroComponent  },
      { path: 'login', component: LoginComponent },
      { path: 'listado-camping', component: ListaCampingComponent },
      { path: 'camping/:id', component: InformacionCampingComponent },
      { path: 'perfil', component: PerfilComponent },
    ]
  },
  {
    path: 'admin',
    component: AdminSkeletonComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', redirectTo: '/admin/login', pathMatch: 'full'},
      { path: 'login', component: LoginAdminComponent },
      { path: 'dashboard',
      canActivate:[AuthGuard,RolGuard],
      data: {
        allowedRoles: ['administrador']
      },
       component: DashboardAdminComponent ,
       
      },
      { path: 'lista-usuarios',
      canActivate:[AuthGuard,RolGuard],
      data: {
        allowedRoles: ['administrador']
      },
       component: ListaUsuariosAdminComponent ,
       
      },
      { path: 'lista-usuarios/modificar/:id',
      canActivate:[AuthGuard,RolGuard],
      data: {
        allowedRoles: ['administrador']
      },
       component: ModificarUsuarioAdminComponent ,
       
      },
      { path: 'lista-camping',
      canActivate:[AuthGuard,RolGuard],
      data: {
        allowedRoles: ['administrador']
      },
       component: ListaCampingAdminComponent ,
       
      },
      { path: 'lista-camping/modificar/:id',
      canActivate:[AuthGuard,RolGuard],
      data: {
        allowedRoles: ['administrador']
      },
       component: ModificarCampingComponent ,
       
      },
      { path: 'agregar-camping',
      canActivate:[AuthGuard,RolGuard],
      data: {
        allowedRoles: ['administrador']
      },
       component: AgregarCampingComponent ,
      
      },
      { path: 'ingresos',
      canActivate:[AuthGuard,RolGuard],
      data: {
        allowedRoles: ['administrador']
      },
       component: IngresosCampingComponent ,
       
      },
      { path: 'lista-camping/:id',
      canActivate:[AuthGuard,RolGuard],
      data: {
        allowedRoles: ['administrador']
      },
       component: ListaCampingAdminComponent ,
       
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
