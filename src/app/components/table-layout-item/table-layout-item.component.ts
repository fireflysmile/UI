import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LayoutConfig} from '../../models/layout-config';

@Component({
  selector: 'app-table-layout-item',
  templateUrl: './table-layout-item.component.html',
  styleUrls: ['./table-layout-item.component.scss']
})
export class TableLayoutItemComponent<T> implements OnInit {
  // layout item
  @Input() layout: LayoutConfig<T>;
  // handle press
  @Output() handlePress: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  // visibility button click
  @Output() visibilityButtonClick: EventEmitter<void> = new EventEmitter();

  constructor(
    public elementRef: ElementRef<HTMLElement>,
  ) { }

  ngOnInit() {
  }

}
