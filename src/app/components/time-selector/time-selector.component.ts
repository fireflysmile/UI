import {ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnInit, Optional, Self, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {FormControlBaseDirective} from '../form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';
import {isTimeGt, isTimeLt} from '../../utils/validation.util';

const {
  timeOptions,
} = environment;

@Component({
  selector: 'app-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.scss']
})
export class TimeSelectorComponent extends FormControlBaseDirective<string> implements OnInit {
  // ignore focus
  @Input() ignoreFocus = false;
  // invalid state
  @Input() @HostBinding('class.cm-invalid') invalid = false;
  // max time
  @Input() set minTime(minTime: string) {
    this._minTime = minTime;
    this._createFilteredTimeOptions();
  }
  // min time
  @Input() set maxTime(maxTime: string) {
    this._maxTime = maxTime;
    this._createFilteredTimeOptions();
  }
  // value
  value = '';
  // time opened
  opened = false;
  // filtered time options
  filteredTimeOptions: string[] = [];
  // min time
  private _minTime: string;
  // max time
  private _maxTime: string;
  // time options
  private readonly _timeOptions = timeOptions;

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    public elementRef: ElementRef<HTMLElement>,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngControl, changeDetectorRef);
    this._defaultValue = '';
  }

  ngOnInit() {
  }

  /**
   * write value
   * @param value value to write
   */
  writeValue(value: string) {
    this.value = value;
  }

  /**
   * create filtered time options
   */
  private _createFilteredTimeOptions(): void {
    this.filteredTimeOptions = this._timeOptions.filter(item => {
      const overMin = isTimeGt(item, this._minTime);
      const underMax = isTimeLt(item, this._maxTime);

      return overMin && underMax;
    });
  }
}
