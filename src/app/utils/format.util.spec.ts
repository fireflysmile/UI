import {
  createCSVString,
  toOrdinal,
  getInitial,
  addZero,
  toInteger,
  toFloat,
  dateStringToDate,
  toSplitTime,
} from './format.util';
import { mockTableColumns } from 'src/assets/data/mock-table-columns';
import { mockRequest } from 'src/assets/data/request/mock-request';

describe('Format Util', () => {
  it('should create csv string', () => {
    expect(createCSVString(mockTableColumns, mockRequest)).toBeTruthy();
  });

  it('should convert to ordinal', () => {
    expect(toOrdinal(1)).toEqual('1st');
    expect(toOrdinal(2)).toEqual('2nd');
    expect(toOrdinal(3)).toEqual('3rd');
    expect(toOrdinal(4)).toEqual('4th');
  });

  it('should get initial', () => {
    expect(getInitial('test')).toEqual('T');
    expect(getInitial(null)).toEqual('');
    expect(getInitial('test', 2)).toEqual('T');
  });

  it('should add zero', () => {
    expect(addZero(9, 10)).toEqual('09');
    expect(addZero(90, 10)).toEqual('90');
    expect(addZero(90)).toEqual('90');
  });

  it('should convert integer', () => {
    expect(toInteger(9)).toEqual(9);
    expect(toInteger('9')).toEqual(9);
  });

  it('should convert float', () => {
    expect(toFloat(9.5)).toEqual(9.5);
    expect(toFloat('9.5')).toEqual(9.5);
  });

  it('should convert string to date', () => {
    expect(dateStringToDate('7/9/2010')).toEqual(new Date(2010, 8, 7));
    expect(dateStringToDate('7/9/2010', '/')).toEqual(new Date(2010, 8, 7));
    expect(dateStringToDate('7/9/2010', '.')).toEqual(undefined);
    expect(dateStringToDate('7.9.2', '.')).toEqual(undefined);
  });

  it('should split time', () => {
    expect(toSplitTime(null)).toEqual([]);
    expect(toSplitTime('10:2')).toEqual([10, 2]);
  });
});
