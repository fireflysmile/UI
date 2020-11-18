import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StatusStepItem} from '../status-stepper-item/status-stepper-item.component';

@Component({
  selector: 'app-status-stepper',
  templateUrl: './status-stepper.component.html',
  styleUrls: ['./status-stepper.component.scss']
})
export class StatusStepperComponent implements OnInit {
  // set status steps
  @Input() set steps(steps: StatusStepItem[]) {
    this._steps = steps;
    this.lastIndex = steps.length - 1;
  }
  // step click
  @Output() stepClick: EventEmitter<StatusStepItem> = new EventEmitter<StatusStepItem>();
  // last index
  lastIndex = 0;
  // steps
  private _steps: StatusStepItem[] = [];

  constructor() { }

  ngOnInit() {
  }

  /**
   * return steps
   */
  get steps(): StatusStepItem[] {
    return this._steps;
  }
}
