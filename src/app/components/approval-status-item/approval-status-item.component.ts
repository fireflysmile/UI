import {Component, Input, OnInit} from '@angular/core';
import {PriorApprovalStatus, PriorApprovalType} from '../../models/prior-approval-item';

@Component({
  selector: 'app-approval-status-item',
  templateUrl: './approval-status-item.component.html',
  styleUrls: ['./approval-status-item.component.scss']
})
export class ApprovalStatusItemComponent implements OnInit {
  // approval type
  @Input() type: PriorApprovalType;
  // status
  @Input() status: PriorApprovalStatus;
  // rejected reason
  @Input() rejectedReason: string;

  constructor() { }

  ngOnInit() {
  }

}
