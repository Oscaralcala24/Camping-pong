import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { CoreModule } from './core/core.module';
import { ModulesModule } from './modules/modules.module';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { StarRatingModule } from 'angular-star-rating';
import { RouterModule } from '@angular/router';
import { UserService } from './service/userService/user.service';
import { AdminSkeletonComponent } from './layout/admin-skeleton/admin-skeleton.component';
import { HeaderAdminComponent } from './layout/header-admin/header-admin.component';
import { FooterAdminComponent } from './layout/footer-admin/footer-admin.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    SkeletonComponent,
    FooterComponent,
    NavigationComponent,
    HeaderComponent,
    AdminSkeletonComponent,
    HeaderAdminComponent,
    FooterAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    CoreModule,
    ModulesModule,
    HttpClientModule,
    NgxPaginationModule,
    StarRatingModule.forRoot(),
  ],
  providers: [UserService,AuthGuard,{
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
