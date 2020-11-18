import {Component, Input, OnInit} from '@angular/core';
import {ActionItem} from '../../models/action-item';

@Component({
  selector: 'app-card-actions',
  templateUrl: './card-actions.component.html',
  styleUrls: ['./card-actions.component.scss']
})
export class CardActionsComponent implements OnInit {
  // action groups
  @Input() actionGroups: ActionItem[][] = [];
  // display date
  displayDate = new Date();

  constructor() { }

  ngOnInit() {
  }

}
