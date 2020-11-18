import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderModificationOverviewBaseComponent } from './order-modification-overview-base.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {ToggleFilterModule} from '../toggle-filter/toggle-filter.module';
import {FormsModule} from '@angular/forms';
import {InlineButtonModule} from '../inline-button/inline-button.module';
import {DividerModule} from '../divider/divider.module';
import {DivisionCardModule} from '../division-card/division-card.module';



@NgModule({
  declarations: [OrderModificationOverviewBaseComponent],
  imports: [
    CommonModule,
    RectCardModule,
    ToggleFilterModule,
    FormsModule,
    InlineButtonModule,
    DividerModule,
    DivisionCardModule,
  ],
  exports: [
    OrderModificationOverviewBaseComponent,
    RectCardModule,
    ToggleFilterModule,
    FormsModule,
    InlineButtonModule,
    DividerModule,
    DivisionCardModule,
  ]
})
export class OrderModificationOverviewBaseModule { }
