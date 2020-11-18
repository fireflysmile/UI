import { APPLICATION_REQUEST_INITIAL_COLUMNS } from './application-request-table';

describe('ApplicationRequestTable', () => {
  it('should get correct router link', () => {
    expect(APPLICATION_REQUEST_INITIAL_COLUMNS[0].routerLink(null)).toEqual([
      '/',
    ]);
  });
});
