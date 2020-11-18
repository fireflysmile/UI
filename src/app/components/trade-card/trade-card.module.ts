import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeCardComponent } from './trade-card.component';
import { TradeCardTitleComponent } from './trade-card-title/trade-card-title.component';
import { TradeCardSectionNameComponent } from './trade-card-section-name/trade-card-section-name.component';
import { TradeCardSectionValueComponent } from './trade-card-section-value/trade-card-section-value.component';



@NgModule({
  declarations: [
    TradeCardComponent,
    TradeCardTitleComponent,
    TradeCardSectionNameComponent,
    TradeCardSectionValueComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TradeCardComponent,
    TradeCardTitleComponent,
    TradeCardSectionNameComponent,
    TradeCardSectionValueComponent
  ]
})
export class TradeCardModule { }
