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
    ]
  },
  {
    path: 'admin',
    component: AdminSkeletonComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', redirectTo: '/admin/login', pathMatch: 'full'},
      { path: 'login', component: LoginAdminComponent },
      { path: 'dashboard', component: DashboardAdminComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
