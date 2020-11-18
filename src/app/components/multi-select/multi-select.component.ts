import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ContentChildren,
  ElementRef,
  EventEmitter, HostBinding,
  Input, OnDestroy,
  OnInit,
  Optional,
  Output, QueryList,
  Self, ViewChildren
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {OptionComponent} from '../select/option/option.component';
import {FormControlBaseDirective} from '../form-control-base/form-control-base.directive';

export interface MultiSelectOptionItem<T> {
  // value
  value: T;
  // label
  label: string;
  // selected state
  selected?: boolean;
}

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: [
    '../select/select.component.scss',
    './multi-select.component.scss',
  ],
  providers: [
    SubscriptionService,
  ],
})
export class MultiSelectComponent<T> extends FormControlBaseDirective<T[]> implements OnInit, AfterViewInit, OnDestroy {
  // options list
  @Input() set options(options: MultiSelectOptionItem<T>[]) {
    this._options = options;
  }
  // enable cancel the selection
  @Input() cancelable = false;
  // placeholder
  @Input() placeholder = 'Select';
  // cancel click
  @Output() cancelClick: EventEmitter<void> = new EventEmitter();
  // set tabindex to host
  @HostBinding('attr.tabindex') tabindex = 0;
  // view children of option component
  @ViewChildren(OptionComponent) viewOptions: QueryList<OptionComponent<T>>;
  // content children of option component
  @ContentChildren(OptionComponent) contentOptions: QueryList<OptionComponent<T>>;
  // selected label
  selectedLabel: string;
  // opened state
  opened = false;
  // timer for delay
  private _timer;
  // options
  private _options: MultiSelectOptionItem<T>[] = [];

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

  ngOnInit() {
    this._defaultValue = [];
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this._subscribeOptionClicked();
    this._subscribeContentOptionsChange();
  }

  ngOnDestroy(): void {
    clearTimeout(this._timer);
  }

  /**
   * return options
   */
  get options(): MultiSelectOptionItem<T>[] {
    return this._options;
  }

  /**
   * return selected values
   */
  get selectedValue(): T[] {
    return this._options.filter(item => item.selected).map(item => item.value);
  }

  /**
   * return true when content options are existing
   */
  get hasContentOptions(): boolean {
    return this.contentOptions && this.contentOptions.length > 0;
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
   * set multiple value
   */
  setMultipleValue(): void {
    this.setValue(this.selectedValue);
  }

  /**
   * clear all selection
   */
  clearSelection(): void {
    this._options.forEach(item => item.selected = false);
    this.setMultipleValue();
  }

  /**
   * override set value method
   * close options when value set
   * @param value value
   */
  setValue(value: T[]): void {
    this.markAsDirty();
    super.setValue(value);
  }

  /**
   * write value to select component
   * @param value value
   */
  writeValue(value: T[]): void {
    this._options.forEach(item => item.selected = value.indexOf(item.value) !== -1);
    this._setSelectedLabel();
  }

  /**
   * set selected label
   */
  private _setSelectedLabel(): void {
    if (this.selectedValue.length === 0 || this.selectedValue.length === this._options.length) {
      this.selectedLabel = 'All';
    } else if (this.selectedValue.length === 1) {
      this.selectedLabel = this._options.find(item => item.selected).label;
    } else {
      this.selectedLabel = 'Multiple';
    }
  }

  /**
   * subscribe option clicked
   */
  private _subscribeOptionClicked(): void {
    const subs = this.contentOptions.map(option => {
      return option
        .optionClicked
        .subscribe(value => {
          const found = this._options.find(item => item.value === value);

          if (found) {
            found.selected = !found.selected;
          }

          this.setMultipleValue();
        });
    });

    this.subscriptionService.store('_subscribeOptionClicked', subs);
  }

  /**
   * subscribe for content options change
   */
  private _subscribeContentOptionsChange(): void {
    const sub = this.contentOptions.changes
      .subscribe(() => {
        this._subscribeOptionClicked();
      });

    this.subscriptionService.store('_subscribeContentOptionsChange', sub);
  }
}
