import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFactoChangedModalComponent } from './post-facto-changed-modal.component';
import {ModalModule} from '../modal/modal.module';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [PostFactoChangedModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    IconsModule
  ],
  exports: [
    PostFactoChangedModalComponent,
  ],
})
export class PostFactoChangedModalModule { }
