import { Component, OnInit, Input } from '@angular/core';

export interface LengendsCircle {
  color: string;
  label: string;
}

@Component({
  selector: 'app-legends-circle',
  templateUrl: './legends-circle.component.html',
  styleUrls: ['./legends-circle.component.scss']
})
export class LegendsCircleComponent implements OnInit {

  @Input() data: LengendsCircle[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
