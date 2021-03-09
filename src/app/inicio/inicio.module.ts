import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from '../inicio/inicio.component';
import { Router} from "@angular/router"
import { AfiliarceModule } from '../afiliarce/afiliarce.module';
import { LoginModule } from '../login/login.module';


@NgModule({
  declarations: [],
  imports: [
    
    CommonModule,
    InicioRoutingModule,

    
    
    
  ] 
})
export class InicioModule { 
}


