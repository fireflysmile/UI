import {ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Optional, Self} from '@angular/core';
import {FormControlBaseDirective} from '../form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent<T> extends FormControlBaseDirective<boolean> implements OnInit {
  // set value for checkbox
  // this value only available for the checkbox which is in group
  @Input() value: T;
  // checked state
  isChecked = false;
  // checked change emitter
  // this will not exposed in component
  // only used for checkbox group component
  checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    super(
      ngControl,
      changeDetectorRef,
    );
  }

  ngOnInit(): void {
  }

  /**
   * write value to component
   * @param value value to set
   */
  writeValue(value: boolean): void {
    this.isChecked = value;
  }

  /**
   * toggle checked state on host click
   */
  @HostListener('click')
  onHostClick(): void {
    if (!this.disabled) {
      // new checked state
      const checked = !this.isChecked;

      this.markAsTouched();
      this.markAsDirty();
      this.setValue(checked);
      this.checkedChange.emit(checked);
    }
  }
}
