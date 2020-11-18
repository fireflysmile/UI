import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessManagementTableComponent } from './access-management-table.component';
import {StaticTableModule} from '../static-table/static-table.module';
import {CheckboxModule} from '../checkbox/checkbox.module';
import {FormsModule} from '@angular/forms';
import {StrokeButtonModule} from '../stroke-button/stroke-button.module';
import {SwitchModule} from '../switch/switch.module';
import {ModifyCredentialModalModule} from '../modify-credential-modal/modify-credential-modal.module';
import {ConfirmModalModule} from '../confirm-modal/confirm-modal.module';



@NgModule({
  declarations: [AccessManagementTableComponent],
  exports: [
    AccessManagementTableComponent
  ],
  imports: [
    CommonModule,
    StaticTableModule,
    CheckboxModule,
    FormsModule,
    StrokeButtonModule,
    SwitchModule,
    ConfirmModalModule,
    ModifyCredentialModalModule,
  ]
})
export class AccessManagementTableModule { }
