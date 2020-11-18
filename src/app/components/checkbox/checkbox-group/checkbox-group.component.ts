import {AfterViewInit, ChangeDetectorRef, Component, ContentChildren, OnDestroy, OnInit, Optional, QueryList, Self} from '@angular/core';
import {FormControlBaseDirective} from '../../form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';
import {CheckboxComponent} from '../checkbox.component';
import {SubscriptionService} from '../../../services/subscription/subscription.service';

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class CheckboxGroupComponent<T> extends FormControlBaseDirective<T[]> implements OnInit, AfterViewInit, OnDestroy {
  // checkbox contents
  @ContentChildren(CheckboxComponent) checkboxes: QueryList<CheckboxComponent<T>>;
  // checked items
  checked: T[] = [];
  // timeout timer
  private _timer;

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef,
    private subscriptionService: SubscriptionService,
  ) {
    super(
      ngControl,
      changeDetectorRef,
    );
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._subscribeCheckedChanges();
    this._subscribeCheckboxChanges();

    this._timer = setTimeout(() => {
      this.writeValue(this.getValue());
      this.setDisabledState(this.disabled);
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this._timer);
  }

  /**
   * set checked values
   * @param values values
   */
  writeValue(values: T[]): void {
    this.checked = values || [];
    this._updateCheckedState();
  }

  /**
   * set group as disabled
   * @param isDisabled disabled
   */
  setDisabledState(isDisabled: boolean): void {
    (this.checkboxes || []).forEach((checkbox: CheckboxComponent<T>) => checkbox.setDisable());
  }

  /**
   * update checked state
   */
  private _updateCheckedState(): void {
    (this.checkboxes || []).forEach((checkbox: CheckboxComponent<T>) => {
      checkbox.isChecked = this.checked.some(value => checkbox.value === value);
    });
  }

  /**
   * subscribe checkbox changes
   */
  private _subscribeCheckboxChanges(): void {
    const sub = this.checkboxes.changes
      .subscribe(() => this._subscribeCheckedChanges());

    this.subscriptionService.store('_subscribeCheckboxChanges', sub);
  }

  /**
   * subscribe checked state changes
   */
  private _subscribeCheckedChanges(): void {
    const subs = this.checkboxes.map((checkbox: CheckboxComponent<T>) => {
      return checkbox.checkedChange
        .subscribe(checked => {
          let values: T[];

          if (checked) {
            values = [...this.checked, checkbox.value];
          } else {
            values = this.checked.filter(value => value !== checkbox.value);
          }

          this.setValue(values);
        });
    });

    this.subscriptionService.store('_subscribeCheckedChanges', subs);
  }
}
