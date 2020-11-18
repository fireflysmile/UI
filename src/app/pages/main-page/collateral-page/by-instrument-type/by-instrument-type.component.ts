import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ByInstrumentType } from 'src/app/models/by-instrument-type';
import { DonutChartData } from 'src/app/components/donut-chart/donut-chart.component';
import { CommonHash } from 'src/app/models/common-hash';
import { instrumentTypeConstants } from 'src/app/utils/constants';
import { Router } from '@angular/router';
import { CollateralDetailsPageQuery, CollateralDetailsPageQueryType } from 'src/app/models/collateral-details-page-query';
import * as qs from 'qs';

@Component({
  selector: 'app-by-instrument-type',
  templateUrl: './by-instrument-type.component.html',
  styleUrls: ['./by-instrument-type.component.scss']
})
export class ByInstrumentTypeComponent implements OnInit {

  @Input() set data(input: ByInstrumentType) {
    this.setData(input);
  }

  @Output() segmentChanged = new EventEmitter();

  defaultColors: CommonHash<string[]> = {
    'cash': ['#a2adbe', '#D0D6DE', '#5B6F8D', '#16325C'],
    'nonCash': ['#66A9E3', '#B2D4F1', '#0070D1', '#338DDA']
  };
  donutCharts: CommonHash<DonutChartData[]> = {
    cash: [],
    nonCash: []
  };
  showDownloadModal = false;

  infos: CommonHash<any> = {
    'cash': null,
    'nonCash': null
  };

  // different tab options;
  tabData: string[] = ['ALL', 'MC', 'OF', 'DC', 'OC', 'BLS'];

  activeTab: string = this.tabData[0];

  pieLegends: CommonHash<any> = {
    'cash': null,
    'nonCash': null
  };

  donut2dData: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // raw data to ui data
  setData(input: ByInstrumentType): void {
    if (!input) {
      return;
    }

    this.donutCharts.cash = [];
    this.donutCharts.nonCash = [];

    const  fillChart = (field: string) => {
      for (let i = 0; i < input[field].length; i++) {
        const c = input[field][i];
        this.donutCharts[field].push({
          label: c.name,
          value: c.value,
          color: this.defaultColors[field][i % this.defaultColors[field].length]
        });
      }
      const total = this.donutCharts[field].map(x => x.value).reduce((x, y) => x + y);
      this.infos[field] = {
        total
      };
      this.populateMax(field);
    };

    fillChart('cash');
    fillChart('nonCash');

    this.infos.cash.totalPercent = this.infos.cash.total / (this.infos.cash.total + this.infos.nonCash.total) * 100;
    this.infos.nonCash.totalPercent = this.infos.nonCash.total / (this.infos.cash.total + this.infos.nonCash.total) * 100;
    this.infos.cash.totalPercent = this.infos.cash.totalPercent.toFixed(0);
    this.infos.nonCash.totalPercent = this.infos.nonCash.totalPercent.toFixed(0);

  }

  // pop up a window when user prepare to download file
  downlodClick(): void {

    // this.donutCharts['cash']
    const array2d: any = [];
    array2d.push(['label', 'value', 'type']);
    this.donutCharts.cash.forEach( el => {
      array2d.push([el.label, el.value, 'Cash']);
    });
    this.donutCharts.nonCash.forEach( el => {
      array2d.push([el.label, el.value, 'Non-Cash']);
    });
    this.donut2dData = array2d;

    // exportDocFrom2DArray(array2d)
    this.showDownloadModal = !this.showDownloadModal;
  }

  // event listener for tab changed
  tabChanged(tab): void {
    this.activeTab = tab;
    this.segmentChanged.emit(tab);
  }

  // section click, navigate to collateral details page
  pieClick(data: DonutChartData, type: string) {
    const segmentOptions: any = {};
    if (this.activeTab !== 'ALL') {
      segmentOptions.segment = this.activeTab;
    }
    const qObject: CollateralDetailsPageQuery = {
      type: 'instrument',
      mode: 'excess',
      ...segmentOptions,
      instrumentType: data.label
    };
    const qString = qs.stringify(qObject);
    this.router.navigateByUrl('/main/collateral/excess-collateral-details' + `?${qString}`);
  }

  pieEnter(data: DonutChartData, type: string) {

    this.pieLegends[type] = {
        labels: [data.label, (data.value / this.infos[type].total * 100).toFixed(0) + '%', `INR ${data.value} CR`],
        color: data.color
      };
  }

  pieLeave(data: DonutChartData, type: string) {
    this.populateMax(type);
  }

  populateMax(type: string) {
    const total = this.infos[type].total;
    const maxv = this.findMax(this.donutCharts[type]);
    this.pieLegends[type] = {
        labels: [maxv.label, (maxv.value / total * 100).toFixed(0) + '%', `INR ${maxv.value} CR`],
        color: maxv.color
      };

  }
  findMax(x: DonutChartData[]) {
    let result = x[0];

    for (const d of x) {
      if (result.value < d.value) {
        result = d;
      }
    }
    return result;
  }

  getFullName(name: string) {
    return instrumentTypeConstants[name] && instrumentTypeConstants[name].fullName;
  }

}
