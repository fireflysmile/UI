import {ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {ResponsiveFilterBaseComponent} from '../responsive-filter-base/responsive-filter-base.component';

export type QuantityFilterType = 'default' | 'eq' | 'lte' | 'gte' | 'lt' | 'gt' | 'range';

export interface QuantityValue {
  // filter type
  type: QuantityFilterType;
  // value to filter
  value: string | {
    // start
    start: string;
    // end
    end: string;
  };
}

@Component({
  selector: 'app-dynamic-filter-quantity',
  templateUrl: './dynamic-filter-quantity.component.html',
  styleUrls: ['./dynamic-filter-quantity.component.scss']
})
export class DynamicFilterQuantityComponent extends ResponsiveFilterBaseComponent implements OnInit {
  // set filter
  @Input() set filter(filter: QuantityValue) {
    if (filter) {
      this.type = filter.type;

      if (filter.value) {
        if (typeof filter.value === 'string') {
          this.value = filter.value;
        } else {
          this.start = filter.value.start;
          this.end = filter.value.end;
        }
      }
    }
  }
  // quantity filter change
  @Output() filterChange: EventEmitter<QuantityValue> = new EventEmitter<QuantityValue>();
  // card class
  @HostBinding('class.cm-filter-card') baseClass = true;
  // value
  value = '';
  // from value
  start = '';
  // to value
  end = '';
  // filter type
  type: QuantityFilterType = 'default';
  // opened state
  opened = false;
  // options
  options = [
    {
      label: '- - Search for digits',
      value: 'default',
    },
    {
      label: '= Equals',
      value: 'eq',
    },
    {
      label: '<= Less than or equals',
      value: 'lte',
    },
    {
      label: '>= Greater than or equals',
      value: 'gte',
    },
    {
      label: '< Less than',
      value: 'lt',
    },
    {
      label: '> Greater than',
      value: 'gt',
    },
    {
      label: ':: In the range',
      value: 'range',
    },
  ];

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    super(changeDetectorRef);
  }

  ngOnInit() {
  }

  /**
   * emit filter change
   */
  emitFilterChange(): void {
    if (this.type === 'range') {
      if (this.start || this.end) {
        return this.filterChange.emit({
          type: this.type,
          value: {
            start: this.start,
            end: this.end,
          },
        });
      }
    } else {
      if (this.value) {
        return this.filterChange.emit({
          type: this.type,
          value: this.value,
        });
      }
    }

    this.filterChange.emit(null);
  }

  /**
   * handle type change
   * @param type changed type
   */
  onTypeChange(type: QuantityFilterType): void {
    this.start = '';
    this.end = '';
    this.type = type;

    if (type === 'range') {
      this.value = '';
    }

    this.emitFilterChange();
  }
}
