import {Directive, Input, TemplateRef} from '@angular/core';
import {TsColumnSortDirection} from '../models/ts-column-sort-event';

/**
 * initial direction of sortable column
 */
export const TS_COLUMN_DEFAULT_SORT_DIRECTION: TsColumnSortDirection = 'asc';

/**
 * @usage
 * <ng-template
 *   [useSort]="true"
 *   sortProperty="property"
 *   tsHeaderColumn>
 *   // header label to be here
 * </ng-template>
 */
@Directive({
  selector: '[appHeaderColumn]'
})
export class HeaderColumnDirective {
  // flag for using sort
  @Input() useSort = false;
  // sort property
  @Input() sortProperty: string;
  // key name
  @Input() key: string;
  // current sort direction
  direction: TsColumnSortDirection = TS_COLUMN_DEFAULT_SORT_DIRECTION;

  constructor(
    public templateRef: TemplateRef<HTMLLIElement>,
  ) { }

  /**
   * change column sort direction
   */
  changeSortDirection(): void {
    if (this.useSort) {
      switch (this.direction) {
        case 'asc': {
          this.direction = 'desc';
          break;
        }

        case 'desc': {
          this.direction = 'asc';
          break;
        }
      }
    }
  }

  /**
   * initialize sort direction
   */
  initSortDirection(): void {
    this.direction = TS_COLUMN_DEFAULT_SORT_DIRECTION;
  }
}
