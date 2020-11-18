import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rules-filter-item',
  templateUrl: './rules-filter-item.component.html',
  styleUrls: ['./rules-filter-item.component.scss']
})
export class RulesFilterItemComponent implements OnInit {
  // label
  @Input() label: string;

  constructor() { }

  ngOnInit(): void {
  }

}
