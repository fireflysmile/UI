import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PcCodeRulesComponent } from './pc-code-rules.component';
import {PcCodeRuleItemModule} from '../pc-code-rule-item/pc-code-rule-item.module';



@NgModule({
  declarations: [PcCodeRulesComponent],
  exports: [
    PcCodeRulesComponent
  ],
  imports: [
    CommonModule,
    PcCodeRuleItemModule
  ]
})
export class PcCodeRulesModule { }
