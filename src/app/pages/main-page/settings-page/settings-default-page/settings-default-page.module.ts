import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsDefaultPageRoutingModule } from './settings-default-page-routing.module';
import { SettingsDefaultPageComponent } from './settings-default-page.component';
import {RectCardModule} from '../../../../components/rect-card/rect-card.module';
import {IconsModule} from '../../../../components/icons/icons.module';


@NgModule({
  declarations: [SettingsDefaultPageComponent],
  imports: [
    CommonModule,
    SettingsDefaultPageRoutingModule,
    RectCardModule,
    IconsModule
  ]
})
export class SettingsDefaultPageModule { }
