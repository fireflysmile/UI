import { OLOC_SPLIT_APPLICATION_INITIAL_COLUMNS } from './oloc-split-application-table';

describe('OlocSplitApplicationTable', () => {
  it('should get correct router link', () => {
    expect(OLOC_SPLIT_APPLICATION_INITIAL_COLUMNS[0].routerLink(null)).toEqual([
      '/main/application-review',
    ]);
  });
});
