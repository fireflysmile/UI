import { InstrumentTypePipe } from './instrument-type.pipe';

describe('InstrumentTypePipe', () => {
  it('create an instance', () => {
    const pipe = new InstrumentTypePipe();
    expect(pipe).toBeTruthy();
  });
  it('should transform correct', () => {
    const pipe = new InstrumentTypePipe();
    expect(pipe.transform('unknownProp')).toEqual('unknownProp');
  });
});
