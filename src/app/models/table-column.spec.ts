import { AdminRequestItem } from './admin-request-item';
import { TableColumn } from './table-column';

describe('Table Column', () => {
  it('should create table column', () => {
    const tableColumn = new TableColumn<AdminRequestItem>(
      'Application submitted on',
      'applicationSubmittedOn',
      null
    );
    expect(tableColumn).toBeTruthy();
  });
  it('should toggle search table column', () => {
    const tableColumn = new TableColumn<AdminRequestItem>(
      'Application submitted on',
      'applicationSubmittedOn',
      null
    );
    tableColumn.toggleSortDirection();
    expect(tableColumn.sortDirection).toEqual('asc');
    tableColumn.toggleSortDirection();
    expect(tableColumn.sortDirection).toEqual('desc');
    tableColumn.toggleSortDirection();
    expect(tableColumn.sortDirection).toEqual('');
  });
});
