import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() data: string[] = [];
  @Input() active = '';
  @Output() changed = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    if (!this.active && this.data.length) {
      this.active = this.data[0];
    }
  }

  itemClick(item: string) {
    this.active = item;
    this.changed.emit(item);
  }

}
