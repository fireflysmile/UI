import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ContentChildren, ElementRef, EventEmitter, HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional, Output,
  QueryList,
  Self,
  ViewChildren
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {OptionComponent} from './option/option.component';
import {FormControlBaseDirective} from '../form-control-base/form-control-base.directive';
import {SubscriptionService} from '../../services/subscription/subscription.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class SelectComponent<T> extends FormControlBaseDirective<T> implements OnInit, AfterViewInit, OnDestroy {
  // auto width
  @Input() autoWidth = true;
  // options list
  @Input() set options(options: T[]) {
    this._options = options;
    this._setSelectedLabel();
  }
  // enable cancel the selection
  @Input() cancelable = false;
  // placeholder
  @Input() placeholder: string;
  // if its a typeahead
  @Input() isTypeahead = false;
  // cancel click
  @Output() cancelClick: EventEmitter<void> = new EventEmitter();
  // set tabindex to host
  @HostBinding('attr.tabindex') tabindex = 0;
  // view children of option component
  @ViewChildren(OptionComponent) viewOptions: QueryList<OptionComponent<T>>;
  // content children of option component
  @ContentChildren(OptionComponent) contentOptions: QueryList<OptionComponent<T>>;
  // selected value
  selectedValue: T;
  // selected label
  selectedLabel: string;
  // opened state
  opened = false;
  // timer for delay
  private _timer;
  // options
  private _options: T[] = [];

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    public elementRef: ElementRef<HTMLElement>,
    protected changeDetectorRef: ChangeDetectorRef,
    protected subscriptionService: SubscriptionService,
  ) {
    super(
      ngControl,
      changeDetectorRef,
    );
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this._setSelectedLabel();
    this._subscribeOptionClicked();
    this._subscribeViewOptionsChange();
    this._subscribeContentOptionsChange();
  }

  ngOnDestroy(): void {
    clearTimeout(this._timer);
  }

  get options(): T[] {
    return this._options;
  }

  /**
   * return true when content options are existing
   */
  get hasContentOptions(): boolean {
    return this.contentOptions && this.contentOptions.length > 0;
  }

  /**
   * return filtered options in case its a typeahead
   */
  get filteredOptions(): T[] {
    if (this.isTypeahead) {
      return this.selectedValue
      ? this.options.filter(option => option.toString().toLowerCase().indexOf(this.selectedValue.toString().toLowerCase()) !== -1)
      : [];
    }
    return this.options;
  }

  /**
   * open options
   */
  openOptions(): void {
    if (!this.disabled) {
      this.opened = true;
      this.changeDetectorRef.detectChanges();
    }
  }

  /**
   * close options with calling touched
   */
  closeOptions(): void {
    this.opened = false;
    this.markAsTouched();
    this.changeDetectorRef.detectChanges();
  }

  /**
   * override set value method
   * close options when value set
   * @param value value
   * @param closeOptions close options
   */
  setValue(value: T, closeOptions = true): void {
    this.markAsDirty();
    super.setValue(value);
    if (closeOptions) {
      this.closeOptions();
    }
  }

  /**
   * write value to select component
   * @param value value
   */
  writeValue(value: T): void {
    this.selectedValue = value;
    this._setSelectedLabel();
  }

  /**
   * subscribe option clicked
   */
  private _subscribeOptionClicked(): void {
    if (this.contentOptions) {
      const subs = this.contentOptions.map(option => {
        return option
          .optionClicked
          .subscribe(value => {
            this.setValue(value);
          });
      });

      this.subscriptionService.store('_subscribeOptionClicked', subs);
    }
  }

  /**
   * subscribe for content options change
   */
  private _subscribeContentOptionsChange(): void {
    if (this.contentOptions) {
      const sub = this.contentOptions.changes
        .subscribe(() => {
          this._setSelectedLabel();
          this._subscribeOptionClicked();
        });

      this.subscriptionService.store('_subscribeContentOptionsChange', sub);
    }
  }

  /**
   * subscribe for view options change
   */
  private _subscribeViewOptionsChange(): void {
    const sub = this.viewOptions.changes
      .subscribe(() => {
        this._setSelectedLabel();
      });

    this.subscriptionService.store('_subscribeViewOptionsChange', sub);
  }

  /**
   * set selected label
   */
  private _setSelectedLabel(): void {
    if (this.hasContentOptions) {
      // if content options exist, update content option selected state
      // and update selectedLabel
      clearTimeout(this._timer);

      // set timeout to prevent ExpressionChangedAfterItHasBeenCheckedError
      this._timer = setTimeout(() => {
        let selectedOption: OptionComponent<T>;
        this.contentOptions.forEach(option => {
          option.selected = option.value === this.selectedValue;
          option.focused = option.selected;

          if (option.selected) {
            selectedOption = option;
          }
        });

        this.selectedLabel = selectedOption ? selectedOption.label : null;
      });
    } else {
      this.selectedLabel = this.options.find(option => option === this.selectedValue) as any;
    }
  }
}
