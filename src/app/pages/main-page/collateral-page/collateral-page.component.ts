import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { CollateralService } from 'src/app/services/api/collateral.service';
import { SegmentWiseUtiliztion } from 'src/app/models/segment-wise-utilization';
import { DonutChartData } from 'src/app/components/donut-chart/donut-chart.component';
import { CollateralValueAnalysis } from 'src/app/models/collateral-value-analysis';
import { ValueBasedExcess } from 'src/app/models/value-based-excess';
import { ByInstrumentType } from 'src/app/models/by-instrument-type';
import { MaturityTimeline } from 'src/app/models/maturity-timeline';
import { TimeLineData } from 'src/app/components/timeline/timeline.component';
import { FilterChangeEvent } from 'src/app/models/filter-change-event';
import { dateSetZero } from 'src/app/utils/date.util';
import {environment} from '../../../../environments/environment';

const {
  collateralWatchingInterval,
} = environment;

@Component({
  selector: 'app-collateral-page',
  templateUrl: './collateral-page.component.html',
  styleUrls: ['./collateral-page.component.scss'],
})
export class CollateralPageComponent implements OnInit {
  segmentWiseUtilization: SegmentWiseUtiliztion;
  collateralValueAnalysis: CollateralValueAnalysis;
  valueBasedExcess: ValueBasedExcess[];
  byInstrumentType: ByInstrumentType;
  maturityTimeline: MaturityTimeline[];

  tableFilter: FilterChangeEvent[] = [];
  tableMode = 'non-securities';

  _interval

  constructor(
    private collateralService: CollateralService,
    private changeDetectorRef: ChangeDetectorRef,
    // private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.getData();
    this._interval = setInterval(() => this.getData(), collateralWatchingInterval);
  }

  getData() {
    this.collateralService.getSegmentWiseUtilization().subscribe((result) => {
      this.segmentWiseUtilization = result;
    });
    this.collateralService.getCollateralValueAnalysis('ALL').subscribe((result) => {
      this.collateralValueAnalysis = result;
    });
    this.collateralService.getValueBasedExcess().subscribe((result) => {
      this.valueBasedExcess = result;
    });
    this.collateralService.getByInstrumentType('ALL').subscribe((result) => {
      this.byInstrumentType = result;
    });
  }

  tableDataChanged(data) {
    if (data && data.type === 'Non-Securities') {
      this.collateralService.getMaturityTimeline().subscribe((result) => {
        this.maturityTimeline = result;
      });
    }
  }

  timelineBarClicked(data: TimeLineData) {
    const d1 = new Date(data.date);
    dateSetZero(d1);
    const d2 = new Date(data.date);
    d2.setDate(d2.getDate() + 1);
    dateSetZero(d2);
    this.tableMode = 'non-securities';
    this.tableFilter = [];
    this.tableFilter.push({
      property: 'maturityDate',
      value: {start: d1, end: d2},
      type: 'date'
    });

    // this.changeDetectorRef.detectChanges()

  }

  // collateralValueAnalysis segment changed handler
  collateralValueAnalysisChanged(segment) {
    this.collateralService.getCollateralValueAnalysis(segment).subscribe((result) => {
      this.collateralValueAnalysis = result;
    });
  }

  // byInstrumentType segment changed handler
  byInstrumentTypeChanged(segment) {
    this.collateralService.getByInstrumentType(segment).subscribe((result) => {
      this.byInstrumentType = result;
    });
  }
}
