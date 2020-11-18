import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostImplementationPageRoutingModule } from './post-implementation-page-routing.module';
import { PostImplementationPageComponent } from './post-implementation-page.component';
import {RectCardModule} from '../../../../components/rect-card/rect-card.module';
import {StatusTrackerSubHeaderModule} from '../../../../components/status-tracker-sub-header/status-tracker-sub-header.module';
import {PostImplementationQuestionModule} from '../../../../components/post-implementation-question/post-implementation-question.module';
import {RequestForExtensionModule} from '../../../../components/request-for-extension/request-for-extension.module';
import {IconsModule} from '../../../../components/icons/icons.module';
import {FileUploadCardModule} from '../../../../components/file-upload-card/file-upload-card.module';
import {PageActionsModule} from '../../../../components/page-actions/page-actions.module';
import {DirectorSelectionModalModule} from '../../../../components/director-selection-modal/director-selection-modal.module';
import {PostImplementationErrorModule} from '../../../../components/post-implementation-error/post-implementation-error.module';
import {DirectorSubmitDir12Module} from '../../../../components/director-submit-dir12/director-submit-dir12.module';
import {PostFactoChangedModalModule} from '../../../../components/post-facto-changed-modal/post-facto-changed-modal.module';


@NgModule({
  declarations: [PostImplementationPageComponent],
  imports: [
    CommonModule,
    PostImplementationPageRoutingModule,
    RectCardModule,
    StatusTrackerSubHeaderModule,
    PostImplementationQuestionModule,
    RequestForExtensionModule,
    IconsModule,
    FileUploadCardModule,
    PageActionsModule,
    DirectorSelectionModalModule,
    PostImplementationErrorModule,
    DirectorSubmitDir12Module,
    PostFactoChangedModalModule,
  ]
})
export class PostImplementationPageModule { }
