import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifyCredentialModalComponent } from './modify-credential-modal.component';
import {ModalModule} from '../modal/modal.module';
import {UserNameEditableFieldModule} from '../user-name-editable-field/user-name-editable-field.module';
import {EmailIdEditableFieldModule} from '../email-id-editable-field/email-id-editable-field.module';
import {PhoneNumberEditableFieldModule} from '../phone-number-editable-field/phone-number-editable-field.module';
import {ConfirmModalModule} from '../confirm-modal/confirm-modal.module';



@NgModule({
  declarations: [ModifyCredentialModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    UserNameEditableFieldModule,
    EmailIdEditableFieldModule,
    PhoneNumberEditableFieldModule,
    ConfirmModalModule,
  ],
  entryComponents: [
    ModifyCredentialModalComponent,
  ],
  exports: [
    ModifyCredentialModalComponent,
  ]
})
export class ModifyCredentialModalModule { }
