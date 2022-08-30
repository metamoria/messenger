import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguagePageRoutingModule } from './language-routing.module';
import { LanguagePage } from './language.page';

import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    LanguagePageRoutingModule,

    SharedModule
  ],
  declarations: [LanguagePage]
})
export class LanguagePageModule { }
