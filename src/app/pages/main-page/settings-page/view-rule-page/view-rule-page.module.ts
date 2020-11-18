import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRulePageRoutingModule } from './view-rule-page-routing.module';
import { ViewRulePageComponent } from './view-rule-page.component';
import {PageTitleModule} from '../../../../components/page-title/page-title.module';
import {RulesFilterModule} from '../../../../components/rules-filter/rules-filter.module';
import {PcCodeRulesModule} from '../../../../components/pc-code-rules/pc-code-rules.module';
import {PageActionsModule} from '../../../../components/page-actions/page-actions.module';


@NgModule({
  declarations: [ViewRulePageComponent],
  imports: [
    CommonModule,
    ViewRulePageRoutingModule,
    PageTitleModule,
    RulesFilterModule,
    PcCodeRulesModule,
    PageActionsModule
  ]
})
export class ViewRulePageModule { }
