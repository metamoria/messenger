import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PwaSessionCheckPage } from './pwasessioncheck.page';

const routes: Routes = [
  {
    path: '',
    component: PwaSessionCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PwaSessionCheckPageRoutingModule {}
