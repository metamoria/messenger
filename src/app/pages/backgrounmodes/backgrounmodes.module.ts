import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackgrounmodesPageRoutingModule } from './backgrounmodes-routing.module';
import { BackgrounmodesPage } from './backgrounmodes.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
imports: [
CommonModule,
BackgrounmodesPageRoutingModule,
SharedModule 
],
declarations: [BackgrounmodesPage]
})
export class BackgrounmodesPageModule { }