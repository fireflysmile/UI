import {Component, Input, OnInit} from '@angular/core';
import {sum} from '../../utils/other.utils';

export interface RequestStatusBarData {
  label: string;
  subLabel: string;
  value: number;
  color: string;
  // width is calculated when data input
  width?: number;
}

@Component({
  selector: 'app-request-status-bar',
  templateUrl: './request-status-bar.component.html',
  styleUrls: ['./request-status-bar.component.scss']
})
export class RequestStatusBarComponent implements OnInit {
  // set request status bar data
  @Input() set data(data: RequestStatusBarData[]) {
    this._data = data || [];
    this._setDataWidth();
  }
  // data
  private _data: RequestStatusBarData[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * return data
   */
  get data(): RequestStatusBarData[] {
    return this._data;
  }

  /**
   * set data width
   */
  private _setDataWidth(): void {
    if (this._data.length > 0) {
      const total = this._data
        .map(item => item.value)
        .reduce(sum);

      this._data.forEach(item => item.width = item.value / total * 100);
    }
  }
}
