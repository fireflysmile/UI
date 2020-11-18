import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-page-actions',
  templateUrl: './page-actions.component.html',
  styleUrls: ['./page-actions.component.scss']
})
export class PageActionsComponent implements OnInit {
  // cancel label
  @Input() cancel: string;
  // confirm label
  @Input() confirm: string;
  // cancelable
  @Input() cancelable = false;
  // confirmable
  @Input() confirmable = false;
  // confirm loading state
  @Input() confirmLoading = false;
  // cancel click
  @Output() cancelClick: EventEmitter<void> = new EventEmitter<void>();
  // confirm click
  @Output() confirmClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
