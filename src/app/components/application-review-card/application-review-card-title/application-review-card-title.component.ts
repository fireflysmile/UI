import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-application-review-card-title',
  templateUrl: './application-review-card-title.component.html',
  styleUrls: ['./application-review-card-title.component.scss']
})
export class ApplicationReviewCardTitleComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
