import {
  addYearToDate,
  getEndOfDate,
  getPeriodicalDate,
  getStartOfDate,
  getTimestamp,
  truncateDate,
} from './date.util';

describe('Date Util', () => {
  it('should get periodical date', () => {
    expect(
      getPeriodicalDate(new Date(2010, 7, 5), 3, 'second').start.getDate()
    ).toEqual(5);
    expect(
      getPeriodicalDate(new Date(2010, 7, 5), 3, 'second', true).start.getDate()
    ).toEqual(4);
    expect(
      getPeriodicalDate(new Date(2010, 7, 5), 3, 'month', true).start.getDate()
    ).toEqual(5);
  });
  it('should truncate date', () => {
    expect(truncateDate(new Date(2010, 7, 5), 'second').getSeconds()).toEqual(
      0
    );
    expect(truncateDate(new Date(2010, 7, 5), 'minute').getMinutes()).toEqual(
      0
    );
    expect(truncateDate(new Date(2010, 7, 5), 'hour').getHours()).toEqual(0);
    expect(truncateDate(new Date(2010, 7, 5), 'date').getDate()).toEqual(5);
    expect(truncateDate(new Date(2010, 7, 5), 'month').getMonth()).toEqual(7);
    expect(truncateDate(new Date(2010, 7, 5), 'year').getFullYear()).toEqual(
      2010
    );
  });
  it('should get timestamp date', () => {
    expect(getTimestamp()).toBeTruthy();
    expect(getTimestamp(new Date(2010, 7, 5))).toBeTruthy();
  });
  it('should get start of date', () => {
    expect(getStartOfDate(null)).toBeFalsy();
    expect(getStartOfDate(new Date(2010, 7, 5))).toBeTruthy();
  });
  it('should get end of date', () => {
    expect(getEndOfDate(null)).toBeFalsy();
    expect(getEndOfDate(new Date(2010, 7, 5))).toBeTruthy();
  });
  it('should add year to date', () => {
    const date = new Date(2010, 7, 5);
    const dateYear = date.getFullYear();
    let newDate = addYearToDate(null, 10);
    expect(newDate).toBeFalsy();
    newDate = addYearToDate(date, 10);
    const newYear = newDate.getFullYear();
    expect(newYear).toBeGreaterThan(dateYear);
  });
});
