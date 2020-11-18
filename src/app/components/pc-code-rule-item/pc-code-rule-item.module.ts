import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PcCodeRuleItemComponent } from './pc-code-rule-item.component';
import {RectCardModule} from '../rect-card/rect-card.module';
import {CheckboxModule} from '../checkbox/checkbox.module';
import {IconsModule} from '../icons/icons.module';
import {FormFieldModule} from '../form-field/form-field.module';
import {FormsModule} from '@angular/forms';
import {QuantityPipeModule} from '../../pipes/quantity-pipe/quantity-pipe.module';
import {PcCodeRuleDetailModule} from '../pc-code-rule-detail/pc-code-rule-detail.module';



@NgModule({
  declarations: [PcCodeRuleItemComponent],
  exports: [
    PcCodeRuleItemComponent
  ],
  imports: [
    CommonModule,
    RectCardModule,
    CheckboxModule,
    IconsModule,
    FormFieldModule,
    FormsModule,
    QuantityPipeModule,
    PcCodeRuleDetailModule
  ]
})
export class PcCodeRuleItemModule { }
