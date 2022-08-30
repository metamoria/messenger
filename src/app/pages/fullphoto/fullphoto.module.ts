import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullPhotoPageRoutingModule } from './fullphoto-routing.module';
import { FullPhotoPage } from './fullphoto.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
imports: [
CommonModule,
FullPhotoPageRoutingModule,
SharedModule 
],
declarations: [FullPhotoPage]
})
export class FullPhotoPageModule { }