import {Component, HostBinding, Input, OnInit} from '@angular/core';

export type UnderReviewStatusIcon = 'submission' | 'pending' | 'reload';
export type UnderReviewStatusItemStatus = 'completed' | 'pending' | 'disabled';

@Component({
  selector: 'app-under-review-status-item',
  templateUrl: './under-review-status-item.component.html',
  styleUrls: ['./under-review-status-item.component.scss']
})
export class UnderReviewStatusItemComponent implements OnInit {
  // icon
  @Input() icon: UnderReviewStatusIcon;
  // label
  @Input() label: string;
  // date
  @Input() date: Date | string;
  // status
  @Input() set status(status: UnderReviewStatusItemStatus) {
    this.pending = status === 'pending';
    this.disabled = status === 'disabled';
    this.completed = status === 'completed';
  }
  // pending class
  @HostBinding('class.cm-pending') pending = false;
  // disabled class
  @HostBinding('class.cm-disabled') disabled = false;
  // completed class
  @HostBinding('class.cm-completed') completed = false;

  constructor() { }

  ngOnInit() {
  }

}
