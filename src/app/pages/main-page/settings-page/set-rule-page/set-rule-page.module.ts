import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetRulePageRoutingModule } from './set-rule-page-routing.module';
import { SetRulePageComponent } from './set-rule-page.component';
import {SetRulesModule} from '../../../../components/set-rules/set-rules.module';
import {PageActionsModule} from '../../../../components/page-actions/page-actions.module';


@NgModule({
  declarations: [SetRulePageComponent],
  imports: [
    CommonModule,
    SetRulePageRoutingModule,
    SetRulesModule,
    PageActionsModule
  ]
})
export class SetRulePageModule { }
