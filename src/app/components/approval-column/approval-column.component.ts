import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-approval-column',
  templateUrl: './approval-column.component.html',
  styleUrls: ['./approval-column.component.scss']
})
export class ApprovalColumnComponent implements OnInit {
  // label
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}
