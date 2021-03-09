import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AfiliarceComponent } from './afiliarce.component';

const routes: Routes = [
  {
  path: '',
  component: AfiliarceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfiliarceRoutingModule { }
