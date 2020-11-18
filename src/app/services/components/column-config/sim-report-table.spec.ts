import { SIM_REPORT_INITIAL_COLUMNS } from './sim-report-table';

describe('SimpleReportTable', () => {
  it('should get correct router link', () => {
    expect(SIM_REPORT_INITIAL_COLUMNS[0].routerLink(null)).toEqual(['/']);
  });
});
