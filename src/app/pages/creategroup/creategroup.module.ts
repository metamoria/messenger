import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreategroupPageRoutingModule } from './creategroup-routing.module';
import { CreategroupPage } from './creategroup.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
imports: [
CommonModule,
CreategroupPageRoutingModule,
SharedModule 
],
declarations: [CreategroupPage]
})
export class CreategroupPageModule { }