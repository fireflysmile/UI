import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input, OnDestroy,
  OnInit,
  Output, QueryList,
  Renderer2,
  ViewChild, ViewChildren
} from '@angular/core';
import {TableColumn, TableColumnSortDirection} from '../../models/table-column';
import {getElement} from '../../utils/element.util';
import {SortChangeEvent} from '../../models/sort-change-event';
import {FilterChangeEvent} from '../../models/filter-change-event';
import {DynamicFilterComponent} from '../dynamic-filter/dynamic-filter.component';
import {onlyForIE} from '../../utils/other.utils';
import { instrumentTypeConstants } from 'src/app/utils/constants';
import { CommonHash } from 'src/app/models/common-hash';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit, AfterViewInit, OnDestroy {
  // loading state
  @Input() loading = false;
  // no select and sort state
  @Input() isNoSelectAndSortFlag = false;
  // select all state
  @Input() selectAll = false;
  // use sort
  @Input() useSort = true;
  // total column length
  @Input() set totalColumnLength(length: number) {
    this.totalColumns = [];

    for (let i = 0; i < length; i++) {
      this.totalColumns.push(i);
    }
  }
  // set data
  @Input() set data(data: T[]) {
    this._data = data;
    this.changeDetectorRef.detectChanges();
    this._calculatesTable();
    this._timers.push(setTimeout(() => this._calculatesTable()));
  }
  // set sort
  @Input() set sort(sort: SortChangeEvent) {
    this._sort = sort;
    this._setSortedColumn();
  }
  // set columns
  @Input() set columns(columns: TableColumn<T>[]) {
    this._columns = columns || [];
    this.changeDetectorRef.detectChanges();
    this._calculatesTable();
    this._timers.push(setTimeout(() => this._calculatesTable()));
  }
  // disable filters
  @Input() disableFilters = false;
  // disable sorts
  @Input() disableSorts = false;
  // column filter creator
  @Input() columnFilterCreator?: () => void;
  // sort change
  @Output() sortChange: EventEmitter<SortChangeEvent> = new EventEmitter<SortChangeEvent>();
  // filter change
  @Output() filterChange: EventEmitter<FilterChangeEvent[]> = new EventEmitter<FilterChangeEvent[]>();
  // select all change
  @Output() selectAllChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  // data table header
  @ViewChild('dataTable') dataTableRef: ElementRef<HTMLTableElement>;
  // selection table header
  @ViewChild('selectionTable') selectionTableRef: ElementRef<HTMLTableElement>;
  // corner table
  @ViewChild('cornerTable') cornerTableRef: ElementRef<HTMLTableElement>;
  // table container
  @ViewChild('tableContainer') tableContainerRef: ElementRef<HTMLElement>;
  // static header
  @ViewChild('staticHeader') staticHeaderRef: ElementRef<HTMLElement>;
  // static column
  @ViewChild('staticColumn') staticColumnRef: ElementRef<HTMLElement>;
  // static corner
  @ViewChild('staticCorner') staticCornerRef: ElementRef<HTMLElement>;
  // dynamic filters
  @ViewChildren(DynamicFilterComponent) dynamicFilterRefs: QueryList<DynamicFilterComponent>;
  // sorted column
  sortedColumn: TableColumn<T>;
  // total columns
  totalColumns: number[] = [];
  // scroll left
  scrollLeft = 0;
  // container width
  containerWidth = 0;
  // data
  private _data: T[] = [];
  // sort event
  private _sort: SortChangeEvent;
  // table columns
  private _columns: TableColumn<T>[] = [];
  // timers
  private _timers: number[] = [];
  // display timer
  private _displayTimer;
  // instrument types constants
  instrumentTypes: CommonHash<any[]> = {};

  constructor(
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this._setStaticTablePositions = this._setStaticTablePositions.bind(this);
    this.instrumentTypes = {
      'Cash': [],
      'Non-Cash': []
    };
    for (const key of Object.keys(instrumentTypeConstants)) {
      this.instrumentTypes[instrumentTypeConstants[key].category].push({
        ...instrumentTypeConstants[key],
        name: key
      });
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._setContainerWidth();
    this._setScrollEvent();
    this._calculatesTable();
  }

  ngOnDestroy(): void {
    this._removeScrollEvent();
    this._timers.forEach(timer => clearTimeout(timer));
    clearTimeout(this._displayTimer);
  }

  /**
   * return data
   */
  get data(): T[] {
    return this._data;
  }

  /**
   * return columns
   */
  get columns(): TableColumn<T>[] {
    return this._columns;
  }

  /**
   * set container width
   */
  private _setContainerWidth(): void {
    const tableContainer = getElement(this.tableContainerRef);

    this.containerWidth = tableContainer.offsetWidth;
    this.changeDetectorRef.detectChanges();
  }

  /**
   * set scroll event
   */
  private _setScrollEvent(): void {
    const tableContainer = getElement(this.tableContainerRef);
    tableContainer.addEventListener('scroll', this._setStaticTablePositions);
  }

  /**
   * remove scroll event
   */
  private _removeScrollEvent(): void {
    const tableContainer = getElement(this.tableContainerRef);
    if (tableContainer) {
      tableContainer.removeEventListener('scroll', this._setStaticTablePositions);
    }
  }

  /**
   * calculate row heights
   */
  private _calculateRowHeights(): void {
    const dataTable = getElement(this.dataTableRef);
    const selectionTable = getElement(this.selectionTableRef);
    const cornerTable = getElement(this.cornerTableRef);

    dataTable.querySelectorAll('tr').forEach((row, index) => {
      const height = row.offsetHeight + 'px';
      const selectionRow = selectionTable.querySelectorAll('tr')[index];

      if (selectionRow) {
        this.renderer.setStyle(selectionRow, 'height', height);
      }

      const cornerRow = cornerTable.querySelectorAll('tr')[index];

      if (cornerRow) {
        this.renderer.setStyle(cornerRow, 'height', height);
      }
    });

    const firstHeaderHeight = (dataTable.querySelector('thead tr:first-child') as HTMLElement).offsetHeight;

    dataTable.querySelectorAll('thead tr:last-child th').forEach(header => {
      this.renderer.setStyle(header, 'top', firstHeaderHeight + 'px');
    });

    this.changeDetectorRef.detectChanges();
  }

  /**
   * calculate header/corner column widths
   */
  private _calculateColumnWidths(): void {
    const dataTable = getElement(this.dataTableRef);
    const staticHeader = getElement(this.staticHeaderRef);
    const staticColumn = getElement(this.staticColumnRef);
    const staticCorner = getElement(this.staticCornerRef);

    dataTable.querySelectorAll('tr:nth-child(1) th').forEach((column, index) => {
      if (column.classList.contains('cm-fake-column')) {
        return;
      }

      const width = (column as HTMLElement).offsetWidth + 'px';

      const staticHeaderCell = staticHeader.querySelector(`tr:nth-child(1) th:nth-child(${index + 1})`);

      this.renderer.setStyle(staticHeaderCell, 'width', width);

      const staticColumnCell = staticColumn.querySelector(`tr:nth-child(1) th:nth-child(${index + 1})`);

      if (staticColumnCell) {
        this.renderer.setStyle(staticColumnCell, 'width', width);
      }

      this.renderer.setStyle(staticColumn, 'width', width);

      const staticCornerCell = staticCorner.querySelector(`tr:nth-child(1) th:nth-child(${index + 1})`);

      if (staticCornerCell) {
        this.renderer.setStyle(staticCornerCell, 'width', width);
      }

      this.renderer.setStyle(staticCorner, 'width', width);
    });
  }

  /**
   * calculate table properties
   */
  private _calculatesTable(): void {
    this._calculateRowHeights();
    this._calculateColumnWidths();
    this._setStaticTablePositions();
    this.changeDetectorRef.detectChanges();
  }

  /**
   * listen window resize to calculate heights
   */
  @HostListener('window:resize')
  onWindowResize(): void {
    this._calculatesTable();
    this._timers.push(setTimeout(() => this._calculatesTable()));
  }

  /**
   * toggle column sorts
   * @param column column
   * @param direction direction
   */
  toggleColumnSort(column: TableColumn<T>, direction?: TableColumnSortDirection): void {
    this.columns.forEach(item => item.sortDirection = item === column ? column.sortDirection : '');

    if (direction) {
      column.sortDirection = direction;
    } else {
      column.toggleSortDirection();
    }

    if (column.sortDirection === '') {
      this.sortChange.emit(null);
    } else {
      this.sortChange.emit({
        property: column.property as string,
        order: column.sortDirection,
      });
    }
  }

  /**
   * handle filter change
   */
  onFilterChange(): void {
    this.filterChange.emit(this.columns.map(item => ({
      type: item ? item.filterType : null,
      value: item ? item.filter : null,
      property: item ? item.property : null,
    } as FilterChangeEvent)));
  }

  /**
   * set sorted column
   */
  private _setSortedColumn(): void {
    this.sortedColumn = this._sort ? this.columns.find(column => column.property === this._sort.property) : null;
  }

  /**
   * set static table positions
   */
  private _setStaticTablePositions(): void {
    const tableContainer = getElement(this.tableContainerRef);
    const staticHeader = getElement(this.staticHeaderRef);
    const staticColumn = getElement(this.staticColumnRef);
    const staticCorner = getElement(this.staticCornerRef);

    onlyForIE(() => {
      this.renderer.setStyle(staticHeader, 'top', tableContainer.scrollTop + 'px');
      this.renderer.setStyle(staticColumn, 'left', tableContainer.scrollLeft + 'px');
      this.renderer.setStyle(staticCorner, 'top', tableContainer.scrollTop + 'px');
      this.renderer.setStyle(staticCorner, 'left', tableContainer.scrollLeft + 'px');
    });

    this.scrollLeft = tableContainer.scrollLeft;
    this.containerWidth = tableContainer.offsetWidth;
    this.changeDetectorRef.detectChanges();

    clearTimeout(this._displayTimer);

    onlyForIE(() => {
      this.renderer.setStyle(staticHeader, 'display', 'block');
      this.renderer.setStyle(staticColumn, 'display', 'block');
      this.renderer.setStyle(staticCorner, 'display', 'block');
    });
  }

  /**
   * close other filters without target
   * @param target target
   */
  closeOtherFilters(target: DynamicFilterComponent): void {
    this.dynamicFilterRefs.forEach(component => {
      if (component !== target) {
        component.closeModal();
      }
    });
  }

  setHeaderZIndex(header: HTMLTableHeaderCellElement, index: number): void {
    this.renderer.setStyle(header, 'z-index', index);
  }

  showInfo(item: TableColumn<any>, ev: MouseEvent, anchor: HTMLElement) {
    item.showInfo = true;
    const {x, y, width, height} = anchor.getBoundingClientRect();
    item.infoOffset = [x - (70 + 20), y]; // 70 = width of sidebar; 20 = magin-left of table
  }
}
