import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollateralPageComponent } from './collateral-page.component';
import { CollateralPageRoutingModule } from './collateral-page-routing.module';
import { SegmentWiseUtilizationComponent } from './segment-wise-utilization/segment-wise-utilization.component';
import { DonutChartModule } from 'src/app/components/donut-chart/donut-chart.module';
import { CollateralValueAnalysisComponent } from './collateral-value-analysis/collateral-value-analysis.component';
import { TabModule } from 'src/app/components/tab/tab.module';
import { ByInstrumentTypeComponent } from './by-instrument-type/by-instrument-type.component';
import { ValueBasedExcessComponent } from './value-based-excess/value-based-excess.component';
import { HorizontalBarChartModule } from 'src/app/components/horizontal-bar-chart/horizontal-bar-chart.module';
import { TimelineModule } from 'src/app/components/timeline/timeline.module';
import { MaturityTimelineComponent } from './maturity-timeline/maturity-timeline.component';
import { CollateralDetailsTableComponent } from './collateral-details-table/collateral-details-table.component';
import { TablePageBaseModule } from '../table-page-base/table-page-base.module';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { AlertMessageModule } from 'src/app/components/alert-message/alert-message.module';
import { ExportFilesModule } from 'src/app/components/export-files/export-files.module';
import { ExcessCollateralDetailsPageComponent } from './excess-collateral-details-page/excess-collateral-details-page.component';
import { RectCardModule } from 'src/app/components/rect-card/rect-card.module';
import { StackedBarChartModule } from 'src/app/components/stacked-bar-chart/stacked-bar-chart.module';
import { LegendsCircleModule } from 'src/app/components/legends-circle/legends-circle.module';
import { FooterInstrumentTypeReferenceModule
       } from 'src/app/components/footer-instrument-type-reference/footer-instrument-type-reference.module';
import { IconsModule } from 'src/app/components/icons/icons.module';
import { BackButtonModule } from 'src/app/components/back-button/back-button.module';

@NgModule({
  declarations: [
    CollateralPageComponent,
    SegmentWiseUtilizationComponent,
    CollateralValueAnalysisComponent,
    ByInstrumentTypeComponent,
    ValueBasedExcessComponent,
    MaturityTimelineComponent,
    CollateralDetailsTableComponent,
    ExcessCollateralDetailsPageComponent,
  ],
  imports: [
    CommonModule,
    CollateralPageRoutingModule,
    DonutChartModule,
    TabModule,
    HorizontalBarChartModule,
    TimelineModule,
    TablePageBaseModule,
    ModalModule,
    AlertMessageModule,
    ExportFilesModule,
    RectCardModule,
    StackedBarChartModule,
    LegendsCircleModule,
    FooterInstrumentTypeReferenceModule,
    IconsModule,
    BackButtonModule
  ],
})
export class CollateralPageModule {}
