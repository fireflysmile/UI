import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

const {
  requestStatusConfig,
} = environment;

@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.scss']
})
export class RequestStatusComponent implements OnInit {
  // set request status
  @Input() set status(status: string) {
    this._status = status;
    this._setColor();
  }
  // bind color
  @HostBinding('style.color') color: string;
  // status
  private _status: string;
  // request status config
  private readonly _requestStatusConfig = requestStatusConfig;

  constructor() { }

  ngOnInit() {
  }

  /**
   * return status
   */
  get status(): string {
    return this._status;
  }

  /**
   * set color
   */
  private _setColor(): void {
    const key = Object.keys(this._requestStatusConfig).find(item => this._requestStatusConfig[item].value === this._status);

    this.color = this._requestStatusConfig[key].color;
  }
}
