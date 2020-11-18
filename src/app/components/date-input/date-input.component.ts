import {
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  ViewChild
} from '@angular/core';
import {FormControlBaseDirective} from '../form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {dateStringToDate} from '../../utils/format.util';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent extends FormControlBaseDirective<Date> implements OnInit {
  // min date
  @Input() minDate: Date;
  // max date
  @Input() maxDate: Date;
  // when input focused
  @Output() inputFocus: EventEmitter<void> = new EventEmitter();
  // input ref
  @ViewChild('input') inputRef: ElementRef<HTMLInputElement>;
  // value
  value = '';
  // date pipe
  private _datePipe: DatePipe = new DatePipe('en-US');

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngControl, changeDetectorRef);
  }

  ngOnInit() {
  }

  /**
   * write value
   * @param value value
   */
  writeValue(value: Date): void {
    this.value = this._datePipe.transform(value, 'dd-MM-yyyy');
  }

  /**
   * set string value to date value
   * @param value string value
   */
  setStringValue(value: string): void {
    this.value = value;

    const date = dateStringToDate(this.value, '-');

    this.setErrors(null);
    this.setValue(null);

    if (date) {
      if (this.minDate) {
        if (this.minDate.valueOf() < date.valueOf()) {
          this.setValue(date);
        } else {
          this.setErrors({
            invalid: date,
          });
        }
      } else if (this.maxDate) {
        if (this.maxDate.valueOf() > date.valueOf()) {
          this.setValue(date);
        } else {
          this.setErrors({
            invalid: date,
          });
        }
      } else {
        this.setValue(date);
      }
    }
  }

  /**
   * set focus to input
   */
  focus(): void {
    this.inputRef.nativeElement.focus();
  }

  /**
   * reset value
   */
  reset(): void {
    this.setValue(null);
    this.value = '';
  }
}
