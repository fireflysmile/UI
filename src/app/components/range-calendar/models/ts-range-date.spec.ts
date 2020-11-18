import { TsRangeDate } from './ts-range-date';

describe('TsRangeDate', () => {
  it('should set correct value', () => {
    let dateRange = new TsRangeDate(
      new Date(2010, 7, 5),
      new Date(2010, 7, 5),
      new Date(2010, 7, 5),
      new Date(2010, 7, 5),
      new Date(2010, 7, 5),
      new Date(2010, 7, 5)
    );
    expect(dateRange.isStart).toBeTruthy();
    expect(dateRange.isEnd).toBeTruthy();
    expect(dateRange.isBefore).toBeFalsy();
    expect(dateRange.isRanged).toBeTruthy();

    dateRange = new TsRangeDate(
      new Date(2010, 7, 5),
      new Date(2010, 7, 5),
      new Date(2010, 7, 5),
      null,
      new Date(2010, 7, 5),
      new Date(2010, 7, 5)
    );
    expect(dateRange.isStart).toBeTruthy();
    expect(dateRange.isEnd).toBeFalsy();
    expect(dateRange.isBefore).toBeFalsy();
    expect(dateRange.isRanged).toBeFalsy();

    dateRange = new TsRangeDate(
      new Date(2010, 7, 5),
      new Date(2010, 7, 5),
      null,
      null,
      new Date(2010, 7, 5),
      new Date(2010, 7, 5)
    );
    expect(dateRange.isStart).toBeFalsy();
    expect(dateRange.isEnd).toBeFalsy();
    expect(dateRange.isBefore).toBeFalsy();
    expect(dateRange.isRanged).toBeFalsy();
  });
});
