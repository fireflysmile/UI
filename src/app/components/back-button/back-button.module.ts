import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './back-button.component';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [BackButtonComponent],
  exports: [
    BackButtonComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class BackButtonModule { }
