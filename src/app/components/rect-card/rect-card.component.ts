import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rect-card',
  templateUrl: './rect-card.component.html',
  styleUrls: ['./rect-card.component.scss']
})
export class RectCardComponent implements OnInit {
  // rounded card
  @Input() @HostBinding('class.cm-rounded') rounded = false;

  constructor() { }

  ngOnInit() {
  }

}
