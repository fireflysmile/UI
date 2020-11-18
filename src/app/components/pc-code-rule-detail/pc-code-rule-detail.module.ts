import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PcCodeRuleDetailComponent } from './pc-code-rule-detail.component';
import {InlineButtonModule} from '../inline-button/inline-button.module';
import {IconsModule} from '../icons/icons.module';
import {DividerModule} from '../divider/divider.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [PcCodeRuleDetailComponent],
  exports: [
    PcCodeRuleDetailComponent
  ],
  imports: [
    CommonModule,
    InlineButtonModule,
    IconsModule,
    DividerModule,
    FormsModule
  ]
})
export class PcCodeRuleDetailModule { }
