import { OLOC_ASSIGNED_TASK_INITIAL_COLUMNS } from './oloc-assigned-task-table';

describe('OlocAssignedTaskTable', () => {
  it('should get correct router link', () => {
    expect(OLOC_ASSIGNED_TASK_INITIAL_COLUMNS[0].routerLink(null)).toEqual([
      '/main/application-review',
    ]);
  });
});
