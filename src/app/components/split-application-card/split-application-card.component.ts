import {Component, Input, OnInit} from '@angular/core';

export type SplitApplicationCardIcon =
  'approval'
  | 'submission'
  | 'grid'
  | 'inbox'
  | 'search-doc'
  | 'assignment'
  | 'task';

@Component({
  selector: 'app-split-application-card',
  templateUrl: './split-application-card.component.html',
  styleUrls: ['./split-application-card.component.scss']
})
export class SplitApplicationCardComponent implements OnInit {
  // set label
  @Input() label: string;
  // icon
  @Input() icon: SplitApplicationCardIcon;
  // total value
  @Input() total: number;
  // sub label 1
  @Input() subLabel1: string;
  // sub label 2
  @Input() subLabel2: string;
  // sub label
  @Input() subValue1: number;
  // sub value
  @Input() subValue2: number;
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
