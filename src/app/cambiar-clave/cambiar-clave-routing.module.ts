import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CambiarClaveComponent } from './cambiar-clave.component';

const routes: Routes = [ {
  path: '',
  component: CambiarClaveComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CambiarClaveRoutingModule { }
