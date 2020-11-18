import {ControlValueAccessor, NgControl, ValidationErrors} from '@angular/forms';
import {AfterViewInit, ChangeDetectorRef, Directive, HostBinding, Optional, Self} from '@angular/core';

@Directive({
  selector: '[appFormControlBase]',
  exportAs: 'appFormControlBaseDirective',
})
export class FormControlBaseDirective<T> implements AfterViewInit, ControlValueAccessor {
  // return true when control has error
  @HostBinding('class.ts-error') get hasError(): boolean {
    if (this.hasControl) {
      return this.ngControl.control.invalid && (this.ngControl.control.touched || !this.ngControl.control.pristine);
    }
  }
  // return disabled state
  @HostBinding('class.ts-disabled') get disabled(): boolean {
    if (this.hasControl) {
      return this.ngControl.control.disabled;
    }
  }
  // registered change function
  private _onChange;
  // registered touched function
  private _onTouched;
  // default value
  protected _defaultValue: T;

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  /**
   * write current value when view init
   */
  ngAfterViewInit(): void {
    this.writeValue(this.getValue() || this._defaultValue);
    this.changeDetectorRef.detectChanges();
  }

  get hasControl(): boolean {
    return !!(this.ngControl && this.ngControl.control);
  }

  /**
   * set value
   * @param value value to set
   */
  setValue(value: T): void {
    this.ngControl.control.setValue(value);
  }

  /**
   * return form control value
   */
  getValue(): T {
    return this.ngControl.control.value;
  }

  /**
   * disable the control
   */
  setDisable(): void {
    this.ngControl.control.disable();
  }

  /**
   * enable the control
   */
  setEnable(): void {
    this.ngControl.control.enable();
  }

  /**
   * should override this method from the extended component
   * @param value value to set
   */
  writeValue(value: T): void {
  }

  /**
   * register change function
   * @param fn change function
   */
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  /**
   * register touched function
   * @param fn touched function
   */
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  /**
   * mark as touched
   */
  markAsTouched(): void {
    if (this._onTouched) {
      this._onTouched();
    }
  }

  /**
   * mark as dirty
   */
  markAsDirty(): void {
    if (this._onChange) {
      this._onChange();
    }
  }

  /**
   * set validation errors
   * @param errors errors
   */
  setErrors(errors: ValidationErrors): void {
    this.ngControl.control.setErrors(errors);
  }

  /**
   * get errors from control
   */
  getErrors(): ValidationErrors {
    const errors = {};

    Object.keys(this.ngControl.control.errors || {}).forEach(key => {
      errors[key] = this.ngControl.control.errors[key];
    });

    return errors;
  }
}
