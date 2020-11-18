import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFilterQuantityComponent } from './dynamic-filter-quantity.component';
import {DividerModule} from '../divider/divider.module';
import {FormsModule} from '@angular/forms';
import {ResponsiveFilterBaseModule} from '../responsive-filter-base/responsive-filter-base.module';
import {AutoFocusModule} from '../auto-focus/auto-focus.module';


@NgModule({
  declarations: [DynamicFilterQuantityComponent],
  exports: [
    DynamicFilterQuantityComponent
  ],
  imports: [
    CommonModule,
    DividerModule,
    FormsModule,
    ResponsiveFilterBaseModule,
    AutoFocusModule,
  ]
})
export class DynamicFilterQuantityModule { }
