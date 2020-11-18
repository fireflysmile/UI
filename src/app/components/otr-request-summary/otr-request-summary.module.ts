import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtrRequestSummaryComponent } from './otr-request-summary.component';
import { OtrRequestSummaryItemComponent } from './otr-request-summary-item/otr-request-summary-item.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [OtrRequestSummaryComponent, OtrRequestSummaryItemComponent],
  exports: [
    OtrRequestSummaryComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    IconsModule
  ]
})
export class OtrRequestSummaryModule { }
