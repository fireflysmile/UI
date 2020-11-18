import {Component, Input, OnInit} from '@angular/core';

export type OtrRequestSummaryIcon = 'reload' | 'negative' | 'exclamation' | 'modify' | 'warning';

export interface OtrRequestSummaryData {
  icon: OtrRequestSummaryIcon;
  label: string;
  value: number;
  children?: OtrRequestSummaryData[];
}

@Component({
  selector: 'app-otr-request-summary-item',
  templateUrl: './otr-request-summary-item.component.html',
  styleUrls: ['./otr-request-summary-item.component.scss']
})
export class OtrRequestSummaryItemComponent implements OnInit {
  // data
  @Input() data: OtrRequestSummaryData;

  constructor() { }

  ngOnInit() {
  }

}
