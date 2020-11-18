import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSelectorComponent } from './time-selector.component';
import {FormsModule} from '@angular/forms';
import {AutoCloserModule} from '../auto-closer/auto-closer.module';
import {PositionFixerModule} from '../position-fixer/position-fixer.module';
import {AutoScrollModule} from '../auto-scroll/auto-scroll.module';
import {FormControlBaseModule} from '../form-control-base/form-control-base.module';
import {AutoFocusModule} from '../auto-focus/auto-focus.module';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  declarations: [TimeSelectorComponent],
  exports: [
    TimeSelectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FormControlBaseModule,
    NgxMaskModule.forRoot(),
    AutoCloserModule,
    PositionFixerModule,
    AutoScrollModule,
    AutoFocusModule,
  ],
})
export class TimeSelectorModule { }
