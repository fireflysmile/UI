import {Component, Input, OnInit} from '@angular/core';
import {PriorApprovalDocument} from '../../models/prior-approval-document';

@Component({
  selector: 'app-approval-document-item',
  templateUrl: './approval-document-item.component.html',
  styleUrls: ['./approval-document-item.component.scss']
})
export class ApprovalDocumentItemComponent implements OnInit {
  // document
  @Input() document: PriorApprovalDocument;

  constructor() { }

  ngOnInit() {
  }

}
