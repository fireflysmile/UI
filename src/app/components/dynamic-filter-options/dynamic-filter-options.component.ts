import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableFilterOptionItem} from '../../models/table-column';

@Component({
  selector: 'app-dynamic-filter-options',
  templateUrl: './dynamic-filter-options.component.html',
  styleUrls: ['./dynamic-filter-options.component.scss']
})
export class DynamicFilterOptionsComponent implements OnInit {
  // search string
  @Input() search = '';
  // set selected values
  @Input() set selected(selected: TableFilterOptionItem[]) {
    this._selected = selected || [];
    this._updateSelectedState();
  }
  // set options
  @Input() set options(options: TableFilterOptionItem[]) {
    this._options = options;
    this._updateSelectedState();
  }
  // selected change
  @Output() selectedChange: EventEmitter<TableFilterOptionItem[]> = new EventEmitter<TableFilterOptionItem[]>();
  // selected
  private _selected: TableFilterOptionItem[] = [];
  // options
  private _options: TableFilterOptionItem[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * return filtered options
   */
  get filteredOptions(): TableFilterOptionItem[] {
    return this._options.filter(option => option.label.toString().toLowerCase().indexOf(this.search.toLowerCase()) !== -1);
  }

  /**
   * update selected state when selected changed
   */
  private _updateSelectedState(): void {
    const map = {};

    this._selected.forEach(item => {
      map[item.value] = true;
    });

    this._options.forEach(item => item.selected = map[item.value]);
  }

  /**
   * emit selected change with selected array
   */
  emitSelectedChange(): void {
    const selected = this._options.filter(item => item.selected);

    this.selectedChange.emit(selected.length > 0 ? selected : null);
  }
}
