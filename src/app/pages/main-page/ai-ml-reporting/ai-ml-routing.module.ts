import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AiMlMemberDetailsPageComponent } from './ai-ml-member-details-page/ai-ml-member-details-page.component';
import { AiMlNilSubmissionPageComponent } from './ai-ml-nil-submission-page/ai-ml-nil-submission-page.component';
import { AIMLSubmissionPageComponent } from './ai-ml-submission-page/ai-ml-submission-page.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'submission',
  },
  { path: 'submission', component: AIMLSubmissionPageComponent },
  { path: 'member-details', component: AiMlMemberDetailsPageComponent },
  { path: 'nil-submission', component: AiMlNilSubmissionPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AIMLRoutingModule { }
