import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreategroupPage } from './creategroup.page';

const routes: Routes = [
  {
    path: '',
    component: CreategroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreategroupPageRoutingModule {}
