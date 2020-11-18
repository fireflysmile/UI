import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostImplementationQuestionComponent } from './post-implementation-question.component';
import {PostImplementationCheckModalModule} from '../post-implementation-check-modal/post-implementation-check-modal.module';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [PostImplementationQuestionComponent],
  exports: [
    PostImplementationQuestionComponent
  ],
  imports: [
    CommonModule,
    PostImplementationCheckModalModule,
    IconsModule,
  ]
})
export class PostImplementationQuestionModule { }
