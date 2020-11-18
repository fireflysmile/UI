import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PcClientMapModalComponent } from './pc-client-map-modal.component';
import {ModalModule} from '../modal/modal.module';
import {FlatButtonModule} from '../flat-button/flat-button.module';
import { PcClientMapItemComponent } from './pc-client-map-item/pc-client-map-item.component';
import {FormFieldModule} from '../form-field/form-field.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InlineButtonModule} from '../inline-button/inline-button.module';
import {IconsModule} from '../icons/icons.module';
import {FormErrorModule} from '../form-error/form-error.module';
import {SearchSelectModule} from '../search-select/search-select.module';
import {SelectModule} from '../select/select.module';



@NgModule({
  declarations: [PcClientMapModalComponent, PcClientMapItemComponent],
  imports: [
    CommonModule,
    ModalModule,
    FlatButtonModule,
    FormFieldModule,
    ReactiveFormsModule,
    InlineButtonModule,
    IconsModule,
    FormsModule,
    FormErrorModule,
    SearchSelectModule,
    SelectModule,
  ],
  exports: [
    PcClientMapModalComponent,
  ],
  entryComponents: [
    PcClientMapModalComponent,
  ]
})
export class PcClientMapModalModule { }
