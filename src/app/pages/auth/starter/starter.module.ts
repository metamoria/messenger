import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarterPageRoutingModule } from './starter-routing.module';
import { StarterPage } from './starter.page';

import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    StarterPageRoutingModule,

    SharedModule
  ],
  declarations: [StarterPage]
})
export class StarterPageModule { }
