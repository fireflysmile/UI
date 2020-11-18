import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input, OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {TableColumnFilterType, TableFilterOptionItem} from '../../models/table-column';
import {getElement} from '../../utils/element.util';

@Component({
  selector: 'app-dynamic-filter',
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.scss']
})
export class DynamicFilterComponent implements OnInit, AfterViewInit, OnDestroy {
  // set filter
  @Input() set filter(filter: any) {
    this._filter = filter;

    if (!this.filter) {
      this._removeFilteredState();
    } else if (!this.opened) {
      this._setFilteredState();
    }

    this.changeDetectorRef.detectChanges();
  }
  // set scroll left position of container
  @Input() set scrollLeft(left: number) {
    this._scrollLeft = left;
    this._updatePositions();
  }
  // set container width
  @Input() set containerWidth(width: number) {
    this._containerWidth = width;
    this._updatePositions();
  }
  // whether first filter or not
  @Input() first = false;
  // filter type
  @Input() type: TableColumnFilterType;
  // options
  @Input() options: TableFilterOptionItem[] = [];
  // disabled state
  @Input() disabled = false;
  // filter change
  @Output() filterChange: EventEmitter<any> = new EventEmitter<any>();
  // close other filters
  @Output() filterOpen: EventEmitter<void> = new EventEmitter();
  // filter close
  @Output() filterClose: EventEmitter<void> = new EventEmitter();
  // input
  @ViewChild('input') inputRef: ElementRef<HTMLInputElement>;
  // on left end
  @HostBinding('class.cm-left-end') onLeftEnd = false;
  // on right end
  @HostBinding('class.cm-right-end') onRightEnd = false;
  // value
  value = '';
  // filtered state
  filtered = false;
  // modal opened state
  opened = false;
  // input width
  inputWidth = 0;
  // scroll left
  private _scrollLeft = 0;
  // container width
  private _containerWidth = 0;
  // filter
  private _filter: any;
  // timer
  private _timer;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._timer = setTimeout(() => {
      this._updatePositions();
    });
  }

  ngOnDestroy() {
    clearTimeout(this._timer);
  }

  /**
   * return filter
   */
  get filter(): any {
    return this._filter;
  }

  /**
   * open modal
   */
  openModal(): void {
    if (this.filtered) {
      this.value = '';
    }

    this.opened = true;
    this.filtered = false;
    this.filterOpen.emit();
  }

  /**
   * close modal
   */
  closeModal(): void {
    this.opened = false;

    if (this.filter) {
      this._setFilteredState();
    } else {
      this._removeFilteredState();
    }

    this.filterClose.emit();
  }

  /**
   * clear filter
   */
  clearFilter(): void {
    this._removeFilteredState();
    this.filterChange.emit(null);
  }

  /**
   * set filtered state
   */
  private _setFilteredState(): void {
    this.value = 'Selected';
    this.filtered = true;
  }

  /**
   * remove filtered state
   */
  private _removeFilteredState(): void {
    this.value = '';
    this.filtered = false;
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this._updatePositions();
  }

  private _updatePositions(): void {
    this.changeDetectorRef.detectChanges();
    this._updateInputWidth();
    this._updateLeftRightEnd();
    this.changeDetectorRef.detectChanges();
  }

  private _updateInputWidth(): void {
    const input = getElement(this.inputRef);

    if (input) {
      this.inputWidth = input.offsetWidth;
    }
  }

  private _updateLeftRightEnd(): void {
    this.onLeftEnd = this._scrollLeft + 170 > this.elementRef.nativeElement.offsetLeft;
    this.onRightEnd = this.elementRef.nativeElement.offsetLeft + this.elementRef.nativeElement.offsetWidth > this._containerWidth - 270;
  }
}
