import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { InicioComponent } from './inicio/inicio.component';
import { AfiliarceComponent } from './afiliarce/afiliarce.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ActualizarTitularComponent } from './actualizar-titular/actualizar-titular.component';
import { ProspectoTitularComponent } from './prospecto-titular/prospecto-titular.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';


const routes: Routes = [

  //{ path: '', redirectTo: './inicio/inicio.module#InicioModule', pathMatch: 'full'},
  {path: 'cambiar-clave', component: CambiarClaveComponent},
  {path: 'reportes', component: ReportesComponent},
  {path: 'prospecto-titular', component: ProspectoTitularComponent},
  {path: 'actualizar-titular', component: ActualizarTitularComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'afiliarce', component: AfiliarceComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'datos-personales/:id', component: DatosPersonalesComponent},
  
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: '404', component: InicioComponent},
  {path: '**', redirectTo: '/404'}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule,BrowserAnimationsModule,HttpClientModule ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
