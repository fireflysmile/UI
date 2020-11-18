import { ADMIN_REQUEST_INITIAL_COLUMNS } from './admin-request-table';
import { APPLICATION_INITIAL_COLUMNS } from './application-table';
import { ASSIGNED_TASK_INITIAL_COLUMNS } from './assigned-task-table';

describe('ColumnConfig', () => {
  it('should get correct router link', () => {
    expect(ADMIN_REQUEST_INITIAL_COLUMNS[0].routerLink(null)).toEqual(['/']);
    expect(APPLICATION_INITIAL_COLUMNS[0].routerLink(null)).toEqual(['/']);
    expect(ASSIGNED_TASK_INITIAL_COLUMNS[0].routerLink(null)).toEqual(['/main/application-review']);
  });
});
