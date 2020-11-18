import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostImplementationCheckModalComponent } from './post-implementation-check-modal.component';
import {ModalModule} from '../modal/modal.module';
import {CheckboxModule} from '../checkbox/checkbox.module';
import {IconsModule} from '../icons/icons.module';
import {FormsModule} from '@angular/forms';
import {DateOfChangeItemModule} from '../date-of-change-item/date-of-change-item.module';



@NgModule({
  declarations: [PostImplementationCheckModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    CheckboxModule,
    IconsModule,
    FormsModule,
    DateOfChangeItemModule
  ],
  exports: [
    PostImplementationCheckModalComponent,
  ]
})
export class PostImplementationCheckModalModule { }
