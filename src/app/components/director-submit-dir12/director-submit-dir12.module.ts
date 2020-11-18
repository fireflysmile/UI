import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorSubmitDir12Component } from './director-submit-dir12.component';
import {DirectorSubmitDir12ItemModule} from '../director-submit-dir12-item/director-submit-dir12-item.module';



@NgModule({
  declarations: [DirectorSubmitDir12Component],
  exports: [
    DirectorSubmitDir12Component
  ],
  imports: [
    CommonModule,
    DirectorSubmitDir12ItemModule
  ]
})
export class DirectorSubmitDir12Module { }
