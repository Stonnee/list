import { AuthGuard } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';
import { AuthComponent } from './auth/auth.component';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { reqService } from './service/req.service';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { RegisterComponent } from './register/register.component';


const appRoutes: Routes = [
  {path: 'list',canActivate:[AuthGuard],  component: ListComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'register', component: RegisterComponent},
  {path : '', canActivate:[AuthGuard], component: ListComponent},
  {path : 'not-found', component: FourOhFourComponent},
  {path:'**', redirectTo: 'not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AuthComponent,
    FourOhFourComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    reqService,
    AuthService,
    AuthGuard,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
