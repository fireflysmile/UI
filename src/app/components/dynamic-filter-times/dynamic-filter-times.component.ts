import {ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {ResponsiveFilterBaseComponent} from '../responsive-filter-base/responsive-filter-base.component';
import {isTimeGt, isTimeLt} from '../../utils/validation.util';

export interface TimeValue {
  // start time
  start: string;
  // end time
  end: string;
}

@Component({
  selector: 'app-dynamic-filter-times',
  templateUrl: './dynamic-filter-times.component.html',
  styleUrls: ['./dynamic-filter-times.component.scss']
})
export class DynamicFilterTimesComponent extends ResponsiveFilterBaseComponent implements OnInit {
  // set value
  @Input() set value(value: TimeValue) {
    if (value) {
      this.start = value.start || '';
      this.end = value.end || '';
    }
  }
  // value change
  @Output() valueChange: EventEmitter<TimeValue> = new EventEmitter<TimeValue>();
  // filter card class
  @HostBinding('class.cm-filter-card') cardClass = true;
  // start time
  start = '';
  // end time
  end = '';
  // invalid start
  invalidStart = false;
  // invalid end
  invalidEnd = false;

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    super(changeDetectorRef);
  }

  ngOnInit() {
  }

  /**
   * handle time change
   * @param type changed time type
   * @param time time
   */
  onTimeChange(type: 'start' | 'end', time: string): void {
    switch (type) {
      case 'start': {
        this.start = isTimeLt(time, this.end) ? time : '';
        this.invalidStart = !!(!this.start && this.end);
        break;
      }

      case 'end': {
        this.end = isTimeGt(time, this.start) ? time : '';
        this.invalidEnd = !!(!this.end && this.start);
        break;
      }
    }

    this.emitValueChange();
  }

  /**
   * emit value change
   */
  emitValueChange(): void {
    if (!this.start && !this.end) {
      this.valueChange.emit(null);
    } else {
      this.valueChange.emit({
        start: this.start,
        end: this.end,
      });
    }
  }
}
