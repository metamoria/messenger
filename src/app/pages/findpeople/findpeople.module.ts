import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindPeoplePageRoutingModule } from './findpeople-routing.module';
import { FindPeoplePage } from './findpeople.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
imports: [
CommonModule,
FindPeoplePageRoutingModule,
SharedModule 
],
declarations: [FindPeoplePage]
})
export class FindPeoplePageModule { }