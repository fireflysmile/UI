import {
  HeaderColumnDirective,
  TS_COLUMN_DEFAULT_SORT_DIRECTION,
} from './header-column.directive';

describe('HeaderColumnDirective', () => {
  let directive: HeaderColumnDirective;

  beforeEach(() => {
    directive = new HeaderColumnDirective(null);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should change sort direction', () => {
    directive.changeSortDirection();
    expect(directive.direction).toEqual(TS_COLUMN_DEFAULT_SORT_DIRECTION);
    directive.useSort = true;
    directive.changeSortDirection();
    expect(directive.direction).toEqual('desc');
    directive.changeSortDirection();
    expect(directive.direction).toEqual('asc');
    directive.initSortDirection();
    expect(directive.direction).toEqual(TS_COLUMN_DEFAULT_SORT_DIRECTION);
  });
});
