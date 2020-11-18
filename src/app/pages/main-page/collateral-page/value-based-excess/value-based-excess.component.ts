import { Component, OnInit, Input } from '@angular/core';
import { ValueBasedExcess } from 'src/app/models/value-based-excess';
import { HorizontalBarData } from 'src/app/components/horizontal-bar-chart/horizontal-bar-chart.component';
import { LengendsCircle } from 'src/app/components/legends-circle/legends-circle.component';
import { Router } from '@angular/router';
import { CollateralDetailsPageQuery, CollateralDetailsPageQueryType } from 'src/app/models/collateral-details-page-query';
import * as qs from 'qs';

@Component({
  selector: 'app-value-based-excess',
  templateUrl: './value-based-excess.component.html',
  styleUrls: ['./value-based-excess.component.scss']
})
export class ValueBasedExcessComponent implements OnInit {

  @Input() set data( input: ValueBasedExcess[]) {
    this.setData(input);
  }

  chartData: HorizontalBarData[] = [];

  defaultColors = ['#0DA687', '#88D3C4', '#0DAE9633'];

  legends: LengendsCircle[] = [
    {
      color: this.defaultColors[0],
      label: 'Cash'
    },
    {
      color: this.defaultColors[1],
      label: 'Non-Cash'
    },
    {
      color: this.defaultColors[2],
      label: 'Value based Excess'
    },
  ];

  totalValue: number;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  setData(input: ValueBasedExcess[]): void {

    this.chartData = [];

    this.totalValue = input.map( x => x.cash + x.nonCash + x.valueBasedExcess).reduce((x, y) => x + y, 0);

    for (const d of input) {
      this.chartData.push({
        labelStart: d.name,
        labelEnd: 'Excess INR 1.2 CR',
        data: [
          {
            color: this.defaultColors[0],
            value: d.cash
          },
          {
            color: this.defaultColors[1],
            value: d.nonCash
          }
        ],
        excess: {
          color: this.defaultColors[2],
          value: d.valueBasedExcess
        }
      });
    }
  }

  barClicked(item: any) {
    const qObject: CollateralDetailsPageQuery = {
      type: 'cash' as CollateralDetailsPageQueryType,
      mode: 'excess',
      segment: item.labelStart
    };
    const qString = qs.stringify(qObject);
    this.router.navigateByUrl('/main/collateral/excess-collateral-details' + `?${qString}`);
  }

}
