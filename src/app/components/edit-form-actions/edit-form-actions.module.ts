import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditFormActionsComponent } from './edit-form-actions.component';

import { IconsModule } from '../icons/icons.module';
import { CardActionItemModule } from '../card-action-item/card-action-item.module';

@NgModule({
  declarations: [
    EditFormActionsComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    CardActionItemModule
  ],
  exports: [
    EditFormActionsComponent
  ]
})
export class EditFormActionsModule { }
