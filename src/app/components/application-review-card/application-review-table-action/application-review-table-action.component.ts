import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-application-review-table-action',
  templateUrl: './application-review-table-action.component.html',
  styleUrls: ['./application-review-table-action.component.scss']
})
export class ApplicationReviewTableActionComponent implements OnInit {

  @Input() action: 'add' | 'reset';

  @Output() add = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
