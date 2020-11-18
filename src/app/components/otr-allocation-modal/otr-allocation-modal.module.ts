import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtrAllocationModalComponent } from './otr-allocation-modal.component';
import {ModalModule} from '../modal/modal.module';
import {FlatButtonModule} from '../flat-button/flat-button.module';
import {FormFieldModule} from '../form-field/form-field.module';
import {DividerModule} from '../divider/divider.module';
import {OtrAllocatorModule} from '../otr-allocator/otr-allocator.module';



@NgModule({
  declarations: [OtrAllocationModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    FlatButtonModule,
    FormFieldModule,
    DividerModule,
    OtrAllocatorModule
  ],
  exports: [
    OtrAllocationModalComponent,
  ],
  entryComponents: [
    OtrAllocationModalComponent,
  ],
})
export class OtrAllocationModalModule { }
