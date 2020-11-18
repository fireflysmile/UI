import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactBoxComponent } from './contact-box.component';

import { IconsModule } from '../icons/icons.module';
import { MoreOptionsModule } from '../more-options/more-options.module';
import { AutoCloserModule } from '../auto-closer/auto-closer.module';
import { AutoPositionerModule } from '../auto-positioner/auto-positioner.module';

@NgModule({
  declarations: [ContactBoxComponent],
  imports: [
    CommonModule,
    IconsModule,
    AutoCloserModule,
    MoreOptionsModule,
    AutoPositionerModule
  ],
  exports: [
    ContactBoxComponent
  ]
})
export class ContactBoxModule { }
