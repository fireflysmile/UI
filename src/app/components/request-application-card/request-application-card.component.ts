import {Component, Input, OnInit} from '@angular/core';

export type RequestApplicationCardIcon =
  'approval'
  | 'submission'
  | 'grid'
  | 'inbox'
  | 'search-doc'
  | 'assignment'
  | 'structure-tree'
  | 'note'
  | 'dns'
  | 'instruction';

@Component({
  selector: 'app-request-application-card',
  templateUrl: './request-application-card.component.html',
  styleUrls: ['./request-application-card.component.scss']
})
export class RequestApplicationCardComponent implements OnInit {
  // set label
  @Input() label: string;
  // set second label
  @Input() label2: string;
  // icon
  @Input() icon: RequestApplicationCardIcon;
  // total value
  @Input() total: number;
  // sub label 1
  @Input() subLabel1: string;
  // sub label 2
  @Input() subLabel2: string;
  // sub label 3
  @Input() subLabel3: string;
  // sub label
  @Input() subValue1: number;
  // sub value
  @Input() subValue2: number;
  // sub value
  @Input() subValue3: number;
  // header highlighted
  @Input() headerHighlighted = false;
  // total highlighted
  @Input() totalHighlighted = false;
  // sub label 2 highlighted
  @Input() subLabel2Highlighted = false;
  // sub value 2 highlighted
  @Input() subValue2Highlighted = false;

  constructor() { }

  ngOnInit() {
  }

}
