import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-request-application-small-card',
  templateUrl: './request-application-small-card.component.html',
  styleUrls: ['./request-application-small-card.component.scss']
})
export class RequestApplicationSmallCardComponent implements OnInit {
  // set label
  @Input() label: string;
  // total value
  @Input() total: number;
  // sub label
  @Input() subLabel: string;
  // total highlighted
  @Input() totalHighlighted = false;

  constructor() { }

  ngOnInit() {
  }

}
