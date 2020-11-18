import {Component, Input, OnInit} from '@angular/core';

export interface TabRouterItem {
  // label
  label: string;
  // router link
  route: string | string[];
}

@Component({
  selector: 'app-tab-router',
  templateUrl: './tab-router.component.html',
  styleUrls: ['./tab-router.component.scss']
})
export class TabRouterComponent implements OnInit {
  // tab routes
  @Input() routes: TabRouterItem[] = [];

  constructor() { }

  ngOnInit() {
  }

}
