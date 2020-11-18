import { QuantityPipe } from './quantity.pipe';

describe('QuantityPipe', () => {
  it('create an instance', () => {
    const pipe = new QuantityPipe();
    expect(pipe).toBeTruthy();
    expect(pipe.transform(10000)).toEqual('10,000');
    expect(pipe.transform('10000')).toEqual('10,000');
    expect(pipe.transform('-10000')).toEqual('-10,000');
    expect(pipe.transform('-10000.1')).toEqual('-10,000');
    expect(pipe.transform('-10000.1', 1)).toEqual('-10,000.1');
  });
});
