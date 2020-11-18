import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalOutletComponent } from './modal-outlet/modal-outlet.component';
import { ModalBackgroundComponent } from './modal-background/modal-background.component';
import { ModalContentWrapperComponent } from './modal-content-wrapper/modal-content-wrapper.component';
import {ModalHeaderComponent} from './components/modal-header/modal-header.component';
import {ModalContentComponent} from './components/modal-content/modal-content.component';
import {ModalActionsComponent} from './components/modal-actions/modal-actions.component';
import {ModalContainerComponent} from './components/modal-container/modal-container.component';
import { ModalWrapperComponent } from './modal-wrapper/modal-wrapper.component';
import {IconsModule} from '../icons/icons.module';
import { ModalComponent } from './modal.component';



@NgModule({
  declarations: [
    ModalOutletComponent,
    ModalBackgroundComponent,
    ModalContentWrapperComponent,
    ModalHeaderComponent,
    ModalContentComponent,
    ModalActionsComponent,
    ModalContainerComponent,
    ModalWrapperComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    IconsModule,
  ],
  exports: [
    ModalOutletComponent,
    ModalHeaderComponent,
    ModalContentComponent,
    ModalActionsComponent,
    ModalContainerComponent,
    ModalComponent,
  ],
})
export class ModalModule { }
