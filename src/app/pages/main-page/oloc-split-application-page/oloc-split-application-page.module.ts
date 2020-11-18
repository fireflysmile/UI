import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OlocSplitApplicationPageRoutingModule } from './oloc-split-application-page-routing.module';
import { OlocSplitApplicationPageComponent } from './oloc-split-application-page.component';
import {TablePageBaseModule} from '../table-page-base/table-page-base.module';
import {ToggleFilterModule} from '../../../components/toggle-filter/toggle-filter.module';
import {FormsModule} from '@angular/forms';
import {BackButtonModule} from '../../../components/back-button/back-button.module';
import {RectCardModule} from '../../../components/rect-card/rect-card.module';
// tslint:disable-next-line:max-line-length
import {OlocSplitApplicationChartCardModule} from '../../../components/oloc-split-application-chart-card/oloc-split-application-chart-card.module';
import {RequestApplicationCardModule} from '../../../components/request-application-card/request-application-card.module';
import {RequestApplicationSmallCardModule} from '../../../components/request-application-small-card/request-application-small-card.module';


@NgModule({
  declarations: [OlocSplitApplicationPageComponent],
  imports: [
    CommonModule,
    OlocSplitApplicationPageRoutingModule,
    TablePageBaseModule,
    ToggleFilterModule,
    FormsModule,
    BackButtonModule,
    RectCardModule,
    OlocSplitApplicationChartCardModule,
    RequestApplicationCardModule,
    RequestApplicationSmallCardModule,
  ]
})
export class OlocSplitApplicationPageModule { }
