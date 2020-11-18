import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trade-card-title',
  templateUrl: './trade-card-title.component.html',
  styleUrls: ['./trade-card-title.component.scss']
})
export class TradeCardTitleComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
