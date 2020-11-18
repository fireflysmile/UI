import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PcCodeRule} from '../../models/pc-code-rule';
import {QuantityPipe} from '../../pipes/quantity-pipe/quantity.pipe';
import {PcCodeRuleDetail} from '../../models/pc-code-rule-detail';

@Component({
  selector: 'app-pc-code-rule-item',
  templateUrl: './pc-code-rule-item.component.html',
  styleUrls: ['./pc-code-rule-item.component.scss']
})
export class PcCodeRuleItemComponent implements OnInit {
  // pc code rule data
  @Input() set data(data: PcCodeRule) {
    this._data = data;
    this.marginAmount = this._quantityPipe.transform(this._data?.marginAmount || 0, 2);
  }
  // emit when margin value changed
  @Output() marginChange: EventEmitter<void> = new EventEmitter();
  // margin amount
  marginAmount: string;
  // detail expanded state
  expanded = false;
  // quantity pipe
  private _quantityPipe: QuantityPipe = new QuantityPipe();
  // data
  private _data: PcCodeRule;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * return data
   */
  get data(): PcCodeRule {
    return this._data;
  }

  /**
   * update margin amount
   * @param amount update amount
   */
  updateMarginAmount(amount: string): void {
    this.marginAmount = amount;

    const parsed: number = parseFloat((this.marginAmount || '0').replace(/,/gm, ''));

    if (!isNaN(parsed)) {
      this._data.marginAmount = parsed;
    }
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
   * toggle checked state
   * if updated state is true, then expands details
   * @param state updated state
   */
  toggleCheckedState(state: boolean): void {
    this.data.checked = state;

    if (this.data.checked) {
      this.expanded = true;
    }
  }

  /**
   * delete rule from the item
   * @param rule rule to delete
   */
  deleteRule(rule: PcCodeRuleDetail): void {
    this.data.rules = this.data.rules.filter(item => item !== rule);
  }
}
