import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostImplementationErrorComponent } from './post-implementation-error.component';
import {IconsModule} from '../icons/icons.module';



@NgModule({
  declarations: [PostImplementationErrorComponent],
  exports: [
    PostImplementationErrorComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class PostImplementationErrorModule { }
