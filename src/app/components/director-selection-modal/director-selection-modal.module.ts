import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorSelectionModalComponent } from './director-selection-modal.component';
import {ModalModule} from '../modal/modal.module';
import {CheckboxModule} from '../checkbox/checkbox.module';
import {FormsModule} from '@angular/forms';
import {Nl2brPipeModule} from '../../pipes/nl2br-pipe/nl2br-pipe.module';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [DirectorSelectionModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    CheckboxModule,
    FormsModule,
    Nl2brPipeModule,
    IconsModule
  ],
  exports: [
    DirectorSelectionModalComponent,
  ],
})
export class DirectorSelectionModalModule { }
