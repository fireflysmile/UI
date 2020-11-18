import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-split-application-page',
  templateUrl: './split-application-page.component.html',
  styleUrls: ['./split-application-page.component.scss']
})
export class SplitApplicationPageComponent implements OnInit {
  // now
  now: Date = new Date();

  constructor() { }

  ngOnInit() {
  }

}
