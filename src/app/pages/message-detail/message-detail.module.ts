import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageDetailPageRoutingModule } from './message-detail-routing.module';

import { MessageDetailPage } from './message-detail.page';
import { SharedModule } from '../../shared/shared.module';
import { CdvPipesModule } from '../../providers/safe.module';

@NgModule({
  imports: [
    CommonModule,
    MessageDetailPageRoutingModule,
    SharedModule,
    CdvPipesModule
  ],
  declarations: [MessageDetailPage]
})
export class MessageDetailPageModule {}
