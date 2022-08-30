import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BackgrounmodesPage } from './backgrounmodes.page';

const routes: Routes = [
  {
    path: '',
    component: BackgrounmodesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackgrounmodesPageRoutingModule {}
