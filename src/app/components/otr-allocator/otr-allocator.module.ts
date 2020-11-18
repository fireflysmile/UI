import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtrAllocatorComponent } from './otr-allocator.component';
import {IconsModule} from '../icons/icons.module';
import {InlineButtonModule} from '../inline-button/inline-button.module';
import { OtrAllocationItemComponent } from './otr-allocation-item/otr-allocation-item.component';
import {FormFieldModule} from '../form-field/form-field.module';
import {SelectModule} from '../select/select.module';
import {FormsModule} from '@angular/forms';
import {QuantityPipeModule} from '../../pipes/quantity-pipe/quantity-pipe.module';



@NgModule({
  declarations: [OtrAllocatorComponent, OtrAllocationItemComponent],
  exports: [
    OtrAllocatorComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    InlineButtonModule,
    FormFieldModule,
    SelectModule,
    FormsModule,
    QuantityPipeModule
  ]
})
export class OtrAllocatorModule { }
