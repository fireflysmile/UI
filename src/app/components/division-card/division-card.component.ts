import {Component, Input, OnInit} from '@angular/core';

export type DivisionCardIcon = 'radar';

export interface DivisionCardChildData {
  label: string;
  value: number;
}

export interface DivisionCardData {
  icon: DivisionCardIcon;
  label: string;
  children: DivisionCardChildData[];
}

@Component({
  selector: 'app-division-card',
  templateUrl: './division-card.component.html',
  styleUrls: ['./division-card.component.scss']
})
export class DivisionCardComponent implements OnInit {
  // data
  @Input() data: DivisionCardData;

  constructor() { }

  ngOnInit() {
  }

}
