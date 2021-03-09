import { BrowserModule } from '@angular/platform-browser';
import { NgModule,LOCALE_ID  } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from "@angular/material/select";
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioModule } from "./inicio/inicio.module";
import { InicioRoutingModule } from "./inicio/inicio-routing.module";
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { CommonModule } from '@angular/common';
import { DatosPersonalesModule } from './datos-personales/datos-personales.module';
import { InicioComponent } from './inicio/inicio.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE,MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import {  MatDialogModule } from '@angular/material/dialog';
import { DialogDatosPersonalesComponent } from './dialog-datos-personales/dialog-datos-personales.component';
import { DialogNoAfiliadoComponent } from './dialog-no-afiliado/dialog-no-afiliado.component';
import { AfiliarceComponent } from './afiliarce/afiliarce.component';
import { AfiliarceModule } from './afiliarce/afiliarce.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { DialogMensajesComponent } from './dialog-mensajes/dialog-mensajes.component';
import { DialogMensajesModule } from './dialog-mensajes/dialog-mensajes.module';
import { ActualizarTitularComponent } from './actualizar-titular/actualizar-titular.component';
import { ActualizarTitularModule } from './actualizar-titular/actualizar-titular.module';
import { ProspectoTitularComponent } from './prospecto-titular/prospecto-titular.component';
import { ProspectoTitularModule } from './prospecto-titular/prospecto-titular.module';
import { ReportesComponent } from './reportes/reportes.component';
import { ReportesModule } from './reportes/reportes.module';
import { DialogActualizarDatosComponent } from './dialog-actualizar-datos/dialog-actualizar-datos.component';
import { IonicModule } from '@ionic/angular';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';
import { CambiarClaveModule } from './cambiar-clave/cambiar-clave.module';

@NgModule({
  declarations: [
    AppComponent,
    DatosPersonalesComponent,
    InicioComponent,
    DialogDatosPersonalesComponent,
    DialogNoAfiliadoComponent,
    AfiliarceComponent,
    LoginComponent,
    HomeComponent,
    DialogMensajesComponent,
    ActualizarTitularComponent,
    ProspectoTitularComponent,
    ReportesComponent,
    DialogActualizarDatosComponent,
    CambiarClaveComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule ,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    InicioModule,
    DatosPersonalesModule,
    AfiliarceModule,
    LoginModule,
    HomeModule,
    ActualizarTitularModule,
    ProspectoTitularModule,
    ReportesModule,
    CambiarClaveModule,
    CommonModule,
    IonicModule.forRoot() ,
  ],
  providers: [ReportesComponent, HttpClientModule,HttpClient,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
