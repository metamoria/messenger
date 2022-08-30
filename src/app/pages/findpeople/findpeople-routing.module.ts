import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindPeoplePage } from './findpeople.page';

const routes: Routes = [
  {
    path: '',
    component: FindPeoplePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindPeoplePageRoutingModule {}
