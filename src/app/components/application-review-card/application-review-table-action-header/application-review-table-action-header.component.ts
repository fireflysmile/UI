import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-application-review-table-action-header',
  templateUrl: './application-review-table-action-header.component.html',
  styleUrls: ['./application-review-table-action-header.component.scss']
})
export class ApplicationReviewTableActionHeaderComponent implements OnInit {

  @Input() action: 'add' | 'reset';
  @Input() wrap: boolean;
  public showTooltip: boolean;

  constructor() { }

  ngOnInit() {
  }

}
