import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { DialogMensajesComponent } from '../dialog-mensajes/dialog-mensajes.component';
import { DialogMensajesModule } from '../dialog-mensajes/dialog-mensajes.module';
import { InicioModule } from '../inicio/inicio.module';
import { InicioComponent } from '../inicio/inicio.component';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
  ]
})
export class LoginModule { }
