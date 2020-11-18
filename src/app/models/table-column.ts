export type TableColumnSortDirection = 'asc' | 'desc' | '';

export type TableColumnFilterType =
  | 'default'
  | 'date'
  | 'time'
  | 'quantity'
  | 'none';

export type TableColumnDisplayType =
  | 'default'
  | 'titlecase'
  | 'date'
  | 'request-status'
  | 'instrument-type'
  | 'quantity'
  | 'destination-segment'
  | 'boolean-selector'
  | 'link'
  | 'numeric'
  | 'allocation-status';

export interface TableColumnOptions {
  // column filter type
  filterType?: TableColumnFilterType;
  // date format for date type
  dateFormat?: string;
  // column display type
  displayType?: TableColumnDisplayType;
  // set router link creation method for column when column type is 'link'
  routerLink?: (row: any) => string | string[];
  // set router link click event
  // this will suppress routerLink option
  routerLinkClick?: (row: any) => void;
  // info
  info?: any;
}

export interface TableFilterOptionItem {
  // value for filter
  value: string | number;
  // label for filter
  label: string | number;
  // sub label
  subLabel?: string | number;
  // selected state
  selected?: boolean;
}

export class TableColumn<T> {
  // column filter type
  filterType: TableColumnFilterType = 'default';
  // column display type
  displayType?: TableColumnDisplayType = 'default';
  // date format
  dateFormat = 'dd MMM yyyy';
  // column label
  label: string;
  // column property
  property: keyof T | string;
  // sort direction
  sortDirection: TableColumnSortDirection = '';
  // filter options
  filterOptions: TableFilterOptionItem[] = [];
  // filtered value
  filter: any;
  // info
  info: any;
  // show info flag
  showInfo = false;
  // info panel offset
  infoOffset: number[] = [0, 0];
  // router link
  routerLink: (row: any) => string | string[];
  // router link click event
  routerLinkClick: (row: any) => void;

  constructor(
    label: string,
    property: keyof T | string,
    options: TableColumnOptions = {}
  ) {
    this.label = label;
    this.property = property;

    if (options) {
      this.filterType = options.filterType || this.filterType;
      this.displayType = options.displayType || this.displayType;
      this.dateFormat = options.dateFormat || this.dateFormat;
      this.routerLink = options.routerLink || null;
      this.routerLinkClick = options.routerLinkClick || null;
      this.info = options.info;
    }
  }

  /**
   * toggle table sort direction
   */
  toggleSortDirection(): void {
    switch (this.sortDirection) {
      case '': {
        this.sortDirection = 'asc';
        break;
      }

      case 'asc': {
        this.sortDirection = 'desc';
        break;
      }

      default: {
        this.sortDirection = '';
        break;
      }
    }
  }
}
