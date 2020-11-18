import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {OrderAllocation} from '../../../models/order-allocation';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-otr-allocation-item',
  templateUrl: './otr-allocation-item.component.html',
  styleUrls: ['./otr-allocation-item.component.scss']
})
export class OtrAllocationItemComponent implements OnInit {
  // allocation data
  @Input() data: OrderAllocation;
  // available pc codes
  @Input() codes: string[] = [];
  // set deletable state
  @Input() deletable = false;
  // delete
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  // quantity input
  @ViewChild('qty', {static: false, read: NgModel}) qtyRef: NgModel;
  // value input
  @ViewChild('value', {static: false, read: NgModel}) valueRef: NgModel;

  constructor() { }

  ngOnInit() {
  }

  /**
   * return true when all fields are valid
   */
  get valid(): boolean {
    return !!(this.qtyRef.valid
      && this.valueRef.valid
      && this.data.contactNoteNumber
      && this.data.pcCode
      && this.data.allocatedValue
      && this.data.allocatedQty);
  }

  /**
   * get only numbers
   * @param value value
   */
  private _getOnlyNumbers = (value: string): string => {
    return value
      .split('')
      .filter(char => /[0-9,.]/.test(char))
      .join('');
  }

  /**
   * remove unnecessary characters on input
   * only for numeric field
   * @param event event
   */
  removeUnnecessaryCharsOnInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    input.value = this._getOnlyNumbers(input.value);
  }

  /**
   * handle quantity change
   * @param value changed value
   */
  onQtyChange(value: string): void {
    this.data.allocatedQty = this._getOnlyNumbers(value);
    this._checkErrorState();
  }

  /**
   * handle value change
   * @param value changed value
   */
  onValueChange(value: string): void {
    this.data.allocatedValue = this._getOnlyNumbers(value);
    this._checkErrorState();
  }

  /**
   * check error state for quantity and value
   */
  private _checkErrorState(): void {
    const {nullQty, nullValue} = this._getErrorObjectForFields();

    this.qtyRef.control.setErrors(nullQty ? {nullQty: true} : null);
    this.qtyRef.control.markAsTouched();

    this.valueRef.control.setErrors(nullValue ? {nullValue: true} : null);
    this.valueRef.control.markAsTouched();
  }

  /**
   * return error object for fields
   */
  private _getErrorObjectForFields(): {[k: string]: boolean} {
    const qty = parseFloat(this._getOnlyNumbers(this.qtyRef.value || '0'));
    const value = parseFloat(this._getOnlyNumbers(this.valueRef.value || '0'));

    return {
      nullQty: qty === 0 && value > 0,
      nullValue: qty > 0 && value === 0,
    };
  }

  /**
   * clear errors
   */
  clearErrors(): void {
    this.qtyRef.control.setErrors(null);
    this.valueRef.control.setErrors(null);
  }
}
