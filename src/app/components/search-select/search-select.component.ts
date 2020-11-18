import {ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Optional, Output, Self} from '@angular/core';
import {SelectComponent} from '../select/select.component';
import {NgControl} from '@angular/forms';
import {SubscriptionService} from '../../services/subscription/subscription.service';

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: [
    '../select/select.component.scss',
    './search-select.component.scss'
  ],
  providers: [
    SubscriptionService,
  ]
})
export class SearchSelectComponent extends SelectComponent<string> implements OnInit {
  // emit when search field changed
  @Output() searchChange: EventEmitter<string> = new EventEmitter();
  // search string
  search = '';
  // previous selected value
  previousSelectedValue: string;

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    public elementRef: ElementRef<HTMLElement>,
    protected changeDetectorRef: ChangeDetectorRef,
    protected subscriptionService: SubscriptionService,
  ) {
    super(
      ngControl,
      elementRef,
      changeDetectorRef,
      subscriptionService,
    );
  }

  ngOnInit(): void {
  }

  /**
   * write value to component
   * @param value value to write
   */
  writeValue(value: string): void {
    super.writeValue(value);
    this.search = this.selectedValue;
  }

  /**
   * override close options
   * restore previous selected value when selected value doesn't exist
   */
  closeOptions(): void {
    super.closeOptions();
    this.search = this.selectedValue;
  }
}
