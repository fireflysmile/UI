import { ShorthandedNumberPipe } from './shorthanded-number.pipe';

describe('ShorthandedNumberPipe', () => {
  const pipe = new ShorthandedNumberPipe();

  it('should create sucess', () => {
    expect(pipe).toBeTruthy();
  });
  it('should transform correct value', () => {
    expect(pipe.transform('1000')).toEqual('1K');
    expect(pipe.transform('notnumber')).toEqual(null);
    expect(pipe.transform('900')).toEqual('900');
    expect(pipe.transform('1000000')).toEqual('10L');
    expect(pipe.transform('10000000')).toEqual('1CR');
    expect(pipe.transform('10000000', 1)).toEqual('1.0CR');
  });
});
