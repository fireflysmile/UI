import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoToggleComponent } from './yes-no-toggle.component';

import { CardActionItemModule } from '../card-action-item/card-action-item.module';

@NgModule({
  declarations: [YesNoToggleComponent],
  imports: [
    CommonModule,
    CardActionItemModule
  ],
  exports: [
    YesNoToggleComponent
  ]
})
export class YesNoToggleModule { }
