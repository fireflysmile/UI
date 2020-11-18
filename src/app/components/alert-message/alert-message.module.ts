import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertMessageComponent } from './alert-message.component';

import { IconsModule } from '../icons/icons.module';

@NgModule({
  declarations: [AlertMessageComponent],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [AlertMessageComponent]
})
export class AlertMessageModule { }
