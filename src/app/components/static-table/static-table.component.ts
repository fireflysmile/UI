import {
  AfterContentInit, AfterViewInit,
  Component,
  ContentChildren, ElementRef,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output,
  QueryList, Renderer2, ViewChild
} from '@angular/core';
import {HeaderColumnDirective} from './columns/header-column.directive';
import {BodyColumnDirective} from './columns/body-column.directive';
import {TsRow} from './models/ts-row';
import {TsColumnSortEvent} from './models/ts-column-sort-event';
import {combineLatest} from 'rxjs';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {onlyForIE} from '../../utils/other.utils';
import {getElement} from '../../utils/element.util';

@Component({
  selector: 'app-static-table',
  templateUrl: './static-table.component.html',
  styleUrls: ['./static-table.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class StaticTableComponent<T> implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  // set data
  @Input() set data(data: T[]) {
    this.rows = data.map(item => new TsRow<T>(item));
  }
  // set sort
  @Input() set sort(sort: TsColumnSortEvent) {
    this._sort = sort;
    this._applySortStatus();
  }
  // use fixed header
  @Input() set fixedHeader(fixed: boolean) {
    this._fixedHeader = fixed;
    this._setEventsForIE();
  }
  // flag for using multi sort
  @Input() useMultiSort = false;
  // sort changed event
  @Output() sortChanged: EventEmitter<TsColumnSortEvent> = new EventEmitter<TsColumnSortEvent>();
  // header column list
  @ContentChildren(HeaderColumnDirective, {descendants: true}) headerColumnList: QueryList<HeaderColumnDirective>;
  // body column list
  @ContentChildren(BodyColumnDirective, {descendants: true}) bodyColumnList: QueryList<BodyColumnDirective>;
  // fixed table
  @ViewChild('fixedTable', {static: false}) fixedTableRef: ElementRef<HTMLTableElement>;
  // main table
  @ViewChild('mainTable', {static: false}) mainTableRef: ElementRef<HTMLTableElement>;
  // rows
  rows: TsRow<T>[] = [];
  // sort event
  private _sort: TsColumnSortEvent;
  // fixed header
  private _fixedHeader = false;
  // previous header height
  private _previousHeaderHeight = 0;
  // previous header top
  private _previousHeaderTop = 0;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this._subscribeForChanges();
  }

  ngAfterViewInit(): void {
    this._setEventsForIE();
  }

  ngOnDestroy(): void {
    this._removeAllEvents();
  }

  get fixedHeader(): boolean {
    return this._fixedHeader;
  }

  /**
   * subscribe for changes
   */
  private _subscribeForChanges(): void {
    const sub = combineLatest([
      this.headerColumnList.changes,
      this.bodyColumnList.changes,
    ]).subscribe(() => this._setEventsForIE());

    this.subscriptionService.store('_subscribeForChanges', sub);
  }

  /**
   * set events for ie
   */
  private _setEventsForIE(): void {
    onlyForIE(() => {
      if (this._fixedHeader) {
        this._setWindowResizeListener();
        this._setScrollEventListener();
        this._setTablePositions();
      }
    });
  }

  /**
   * set window resize event listener
   */
  private _setWindowResizeListener(): void {
    window.removeEventListener('resize', this._setTablePositions);
    window.addEventListener('resize', this._setTablePositions);
  }

  /**
   * set scroll event listener
   */
  private _setScrollEventListener(): void {
    const el = getElement(this.elementRef);

    el.removeEventListener('scroll', this._setTablePositions);
    el.addEventListener('scroll', this._setTablePositions);
  }

  /**
   * remove fix events
   */
  private _removeAllEvents(): void {
    const el = getElement(this.elementRef);
    el.removeEventListener('scroll', this._setTablePositions);
    window.removeEventListener('resize', this._setTablePositions);
  }

  /**
   * set header / main table positions
   */
  private _setTablePositions = (): void => {
    this._setMainTablePosition();
    this._setFixedHeaderPosition();
  }

  /**
   * set main table position
   */
  private _setMainTablePosition(): void {
    const fixed = getElement(this.fixedTableRef);
    const main = getElement(this.mainTableRef);

    if (fixed && main) {
      if (this._previousHeaderHeight !== fixed.offsetHeight) {
        this.renderer.setStyle(main, 'margin-top', `${fixed.offsetHeight}px`);
        this._previousHeaderHeight = fixed.offsetHeight;
      }
    }
  }

  /**
   * set fixed header position
   */
  private _setFixedHeaderPosition(): void {
    const fixed = getElement(this.fixedTableRef);
    const el = getElement(this.elementRef);

    if (fixed && el) {
      if (this._previousHeaderTop !== el.scrollTop) {
        this.renderer.setStyle(fixed, 'top', `${el.scrollTop}px`);
        this._previousHeaderTop = el.scrollTop;
      }
    }
  }

  /**
   * apply sort status to header columns
   * this will not emit sort change event
   * just change UI
   */
  private _applySortStatus(): void {
    if (this._sort) {
      this.headerColumnList.forEach(column => {
        column.direction = this._sort[column.sortProperty];
      });
    }
  }

  /**
   * change header column's sort direction
   * @param column column
   */
  changeSortDirection(column: HeaderColumnDirective): void {
    const event: TsColumnSortEvent = new TsColumnSortEvent();

    column.changeSortDirection();

    this.headerColumnList
      .filter(header => header.useSort)
      .forEach(header => {
        // clear sort direction of other columns
        // when useMultiSort is false
        if (!this.useMultiSort) {
          if (header !== column) {
            header.initSortDirection();
          }
        }

        event[header.sortProperty] = header.direction;
      });

    this.sortChanged.emit(event);
  }
}
