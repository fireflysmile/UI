import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapsuleToggleComponent } from './capsule-toggle.component';



@NgModule({
  declarations: [CapsuleToggleComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CapsuleToggleComponent
  ]
})
export class CapsuleToggleModule { }
