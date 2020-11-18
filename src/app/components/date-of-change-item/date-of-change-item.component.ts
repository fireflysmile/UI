import {Component, Input, OnInit} from '@angular/core';
import {NotIncomingResigningDirector} from '../../models/post-implementation-detail';

@Component({
  selector: 'app-date-of-change-item',
  templateUrl: './date-of-change-item.component.html',
  styleUrls: ['./date-of-change-item.component.scss']
})
export class DateOfChangeItemComponent implements OnInit {
  // data
  @Input() data: NotIncomingResigningDirector;
  // opened state
  opened = false;

  constructor() { }

  ngOnInit() {
  }

}
