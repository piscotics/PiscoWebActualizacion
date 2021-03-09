import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio.component';

const routes: Routes = [
  
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: '404', component: InicioComponent},
  {path: '**', redirectTo: '/404'}
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
