import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StartNewRequestComponent } from './start-new-request.component';
import { PageActionsModule } from '../page-actions/page-actions.module';
import { RectCardModule } from '../rect-card/rect-card.module';
import { FormFieldModule } from '../form-field/form-field.module';
import { SelectModule } from '../select/select.module';



@NgModule({
  declarations: [StartNewRequestComponent],
  exports: [
    StartNewRequestComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    RectCardModule,
    PageActionsModule,
    SelectModule
  ]
})
export class StartNewRequestModule { }
