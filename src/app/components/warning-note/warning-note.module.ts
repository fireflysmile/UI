import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningNoteComponent } from './warning-note.component';

import { IconsModule } from '../icons/icons.module';

@NgModule({
  declarations: [WarningNoteComponent],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [
    WarningNoteComponent
  ]
})
export class WarningNoteModule { }
