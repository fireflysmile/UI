import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ApplicationPriorApproval } from 'src/app/models/application-prior-approval';

@Component({
  selector: 'app-prior-approval-table',
  templateUrl: './prior-approval-table.component.html',
  styleUrls: [
    '../../application-review-section-base/application-review-section-base.component.scss',
    './prior-approval-table.component.scss'
  ]
})
export class PriorApprovalTableComponent implements OnInit {

  @Input() priorApproval: ApplicationPriorApproval;
  @Input() statusText: string;
  @Input() viewType: 'maker' | 'checker';
  @Input() completed: boolean;

  @Output() comment = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
