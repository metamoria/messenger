import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PwaSessionCheckPageRoutingModule } from './pwasessioncheck-routing.module';
import { PwaSessionCheckPage } from './pwasessioncheck.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
imports: [
CommonModule,
PwaSessionCheckPageRoutingModule,
SharedModule 
],
declarations: [PwaSessionCheckPage]
})
export class PwaSessionCheckPageModule { }