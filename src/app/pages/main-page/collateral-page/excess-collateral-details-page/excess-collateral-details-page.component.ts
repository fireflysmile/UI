import { Component, OnInit } from '@angular/core';
import { DonutChartData } from 'src/app/components/donut-chart/donut-chart.component';
import { ActivatedRoute } from '@angular/router';
import { CollateralService } from 'src/app/services/api/collateral.service';
import * as _ from 'lodash';
import { DetailedValueBasedExcess } from 'src/app/models/detailed-value-based-excess';
import { LengendsCircle } from 'src/app/components/legends-circle/legends-circle.component';
import { FilterChangeEvent } from 'src/app/models/filter-change-event';
import { instrumentTypeConstants } from 'src/app/utils/constants';
import { InstrumentLevelDetail } from 'src/app/models/Instrument-level-detail';
import {environment} from 'src/environments/environment';

const {
  collateralWatchingInterval,
} = environment;

interface ExcessSummary {
  percent: string;
  // example: [12, 50], 12 is absolute value, 50 is percent
  qtyBasedExcess: any[];
  valueBasedExcess: any[];
  total: number;
}
interface ValueSummary {
  percent: string;
  // example: [12, 50], 12 is absolute value, 50 is percent
  cash: any[];
  nonCash: any[];
  total: number;
}
interface TotalSummary {
  percent: string;
  // example: [12, 50], 12 is absolute value, 50 is percent
  excess: any[];
  cash: any[];
  total: number;
}

interface InternalDonutBarData {
  total: number;
  data: DonutChartData[];
  hasLegends: boolean;
}

@Component({
  selector: 'app-excess-collateral-details-page',
  templateUrl: './excess-collateral-details-page.component.html',
  styleUrls: ['./excess-collateral-details-page.component.scss'],
})
export class ExcessCollateralDetailsPageComponent implements OnInit {
  // different tab options;
  tabData: string[] = ['ALL', 'MC', 'OF', 'DC', 'OC', 'BLS'];

  activeTab: string = this.tabData[0];

  excessSummary: ExcessSummary;
  valueSummary: ValueSummary;
  totalSummary: TotalSummary;
  valueBasedExcess: DetailedValueBasedExcess;
  instrumentDetail: InstrumentLevelDetail;

  tableFilter: FilterChangeEvent[] = [];

  popperInstance;
  tooltipContent = [];

  _interval

  constructor(
    private router: ActivatedRoute,
    private collateralService: CollateralService
  ) {
    this.router.queryParams.subscribe((res) => {
      this.queryParams = res;
      this.tableFilter = [];
      if (this.queryParams.segment) {
        this.tableFilter.push({
          property: 'segment',
          value: [{ value: this.queryParams.segment }],
          type: 'default',
        });
        this.activeTab = this.queryParams.segment;
      }
      if (this.queryParams.instrumentType) {
        this.tableFilter.push({
          property: 'instrumentType',
          value: [{ value: this.queryParams.instrumentType }],
          type: 'default',
        });
      }
      if (this.queryParams.cashType) {
        const resultTypes = _.map(
          _.cloneDeep(instrumentTypeConstants),
          (x) => x
        ).filter((x) => x.category === this.queryParams.cashType);
        for (const t of resultTypes) {
          this.tableFilter.push({
            property: 'instrumentType',
            value: [{ value: t.name }],
            type: 'default',
          });
        }
      }
      if (this.queryParams.instrumentType) {
        this.collateralService
          .getInstrumentLevelDetail(this.queryParams.instrumentType)
          .subscribe((r) => {
            this.instrumentDetail = r;
          });
      }

      this.getTopCardData(this.queryParams.segment);
    });
  }

  queryParams: any = {};

  defaultColors = ['#16325C', '#0070D1', '#B2D4F1'];

  overallCashLimitDonut: InternalDonutBarData = {
    total: 0,
    data: [],
    hasLegends: false,
  };

  isinLevelLimitDonut: InternalDonutBarData = {
    total: 0,
    data: [],
    hasLegends: true,
  };

  secondLegends: LengendsCircle[] = [
    {
      label: 'Cash Limit %',
      color: this.defaultColors[1],
    },
    {
      label: 'TLA Limit %',
      color: this.defaultColors[2],
    },
  ];

  ngOnInit(): void {
    this._interval = setInterval(() => this.getData(), collateralWatchingInterval);
  }

  getData() {
    this.getTopCardData(this.queryParams.segment)
  }

  getTopCardData(segment: string) {
    this.collateralService.getCollateralValueAnalysis(segment).subscribe((result) => {
      const total = _.map(result, (x) => x).reduce((x, y) => x + y);
      const totalExcess = result.qtyBasedExcess + result.valueBasedExcess;
      const totalCash = result.cash + result.nonCash;
      this.excessSummary = {
        total,
        qtyBasedExcess: [
          result.qtyBasedExcess,
          ((result.qtyBasedExcess / totalExcess) * 100).toFixed(0),
        ],
        valueBasedExcess: [
          result.valueBasedExcess,
          ((result.valueBasedExcess / totalExcess) * 100).toFixed(0),
        ],
        percent: (
          ((result.qtyBasedExcess + result.valueBasedExcess) / total) *
          100
        ).toFixed(0),
      };
      this.valueSummary = {
        total,
        cash: [result.cash, ((result.cash / totalCash) * 100).toFixed(0)],
        nonCash: [
          result.nonCash,
          ((result.nonCash / totalCash) * 100).toFixed(0),
        ],
        percent: (((result.cash + result.nonCash) / total) * 100).toFixed(0),
      };
      this.totalSummary = {
        total,
        cash: [
          result.cash + result.nonCash,
          (((result.cash + result.nonCash) / total) * 100).toFixed(0),
        ],
        excess: [totalExcess, ((totalExcess / total) * 100).toFixed(0)],
        percent: ((total / total) * 100).toFixed(0),
      };
    });
    this.collateralService.getDetailedValueBasedExcess(segment).subscribe((result) => {
      this.valueBasedExcess = result;
      this.overallCashLimitDonut.data = [
        {
          label: '',
          tooltip: [
            'Overal Cash Limit',
            'Total Liquid Asset',
            `INR ${this.valueBasedExcess.excessValueOn50CashLimit} CR`,
          ],
          value: this.valueBasedExcess.excessValueOn50CashLimit,
          color: this.defaultColors[0],
        },
      ];
      this.overallCashLimitDonut.total = _.map(
        this.overallCashLimitDonut.data,
        (x) => x.value
      ).reduce((x, y) => x + y, 0);
      this.isinLevelLimitDonut.data = [
        {
          label: '',
          tooltip: [
            'Cash Limit',
            'Total Liquid Asset',
            `INR ${this.valueBasedExcess.excessValueDueToCashComponentLimit} CR`,
          ],
          value: this.valueBasedExcess.excessValueDueToCashComponentLimit,
          color: this.defaultColors[1],
        },
        {
          label: '',
          tooltip: [
            'TLA Limit',
            'Total Liquid Asset',
            `INR ${this.valueBasedExcess.excessValueDueToTlaLimit} CR`,
          ],
          value: this.valueBasedExcess.excessValueDueToTlaLimit,
          color: this.defaultColors[2],
        },
      ];
      this.isinLevelLimitDonut.total = _.map(
        this.isinLevelLimitDonut.data,
        (x) => x.value
      ).reduce((x, y) => x + y);
    });
  }

  // event listener for tab changed
  tabChanged(tab): void {
    this.activeTab = tab;
    this.getTopCardData(tab);
    this.tableFilter = [];
    this.tableFilter.push({
      property: 'segment',
      value: [{ value: tab }],
      type: 'default',
    });
  }
}
