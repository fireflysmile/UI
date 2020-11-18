import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AIMLSubmissionPageComponent } from './ai-ml-submission-page/ai-ml-submission-page.component';
import { AIMLRoutingModule } from './ai-ml-routing.module';
import { PageContentModule } from 'src/app/components/page-content/page-content.module';
import { BackButtonModule } from 'src/app/components/back-button/back-button.module';
import { FormFieldModule } from 'src/app/components/form-field/form-field.module';
import { SelectModule } from 'src/app/components/select/select.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoSizeTextareaModule } from 'src/app/components/auto-size-textarea/auto-size-textarea.module';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { IconsModule } from 'src/app/components/icons/icons.module';
import { AiMlMemberDetailsPageComponent } from './ai-ml-member-details-page/ai-ml-member-details-page.component';
import { AiMlLayoutComponent } from './components/ai-ml-layout/ai-ml-layout.component';
import { RectCardModule } from 'src/app/components/rect-card/rect-card.module';
import { AiMlReportingCardComponent } from './components/ai-ml-reporting-card/ai-ml-reporting-card.component';
import { AiMlNilSubmissionPageComponent } from './ai-ml-nil-submission-page/ai-ml-nil-submission-page.component';
import { CheckboxModule } from 'src/app/components/checkbox/checkbox.module';
import { StatusStepperModule } from 'src/app/components/status-stepper/status-stepper.module';

@NgModule({
  declarations: [
    // Components
    AiMlLayoutComponent,
    // Pages
    AiMlReportingCardComponent,
    AIMLSubmissionPageComponent,
    AiMlMemberDetailsPageComponent,
    AiMlNilSubmissionPageComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    PageContentModule,
    BackButtonModule,
    FormFieldModule,
    SelectModule,
    AutoSizeTextareaModule,
    ReactiveFormsModule,
    StatusStepperModule,
    ModalModule,
    IconsModule,
    CheckboxModule,
    AIMLRoutingModule
  ]
})
export class AIMLModule { }
