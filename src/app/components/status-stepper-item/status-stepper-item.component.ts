import {Component, HostBinding, Input, OnInit} from '@angular/core';

export type StatusStepIcon =
  'submission'
  | 'search-doc'
  | 'approval'
  | 'message'
  | 'people'
  | 'checks';

export interface StatusStepItem {
  // status item
  icon: StatusStepIcon;
  // label
  label: string;
  // clickable state
  clickable: boolean;
  // disabled state
  disabled: boolean;
  // completed state
  completed: boolean;
}

@Component({
  selector: 'app-status-stepper-item',
  templateUrl: './status-stepper-item.component.html',
  styleUrls: ['./status-stepper-item.component.scss']
})
export class StatusStepperItemComponent implements OnInit {
  // icon
  @Input() icon: StatusStepIcon;
  // label
  @Input() label: string;
  // disabled
  @Input() @HostBinding('class.cm-disabled') disabled = false;
  // completed
  @Input() @HostBinding('class.cm-completed') completed = false;
  // clickable
  @Input() @HostBinding('class.cm-clickable') clickable = false;

  constructor() { }

  ngOnInit() {
  }

}
