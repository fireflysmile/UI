import { onlyForIE, onlyForNoneIE } from './other.utils';

describe('Other Util', () => {
  it('should check only for ie', () => {
    let isIE = false;
    onlyForIE(() => {
      isIE = true;
    });
    expect(isIE).toEqual(false);

    // fake ie
    spyOnProperty(window.navigator, 'userAgent').and.returnValue('AMSIE ');
    onlyForIE(null);
    onlyForIE(() => {
      isIE = true;
    });
    expect(isIE).toEqual(true);
  });

  it('should check only for none ie', () => {
    let isNotIE = false;
    onlyForNoneIE(null);
    expect(isNotIE).toEqual(false);
    onlyForNoneIE(() => {
      isNotIE = true;
    });

    expect(isNotIE).toEqual(true);

    // fake ie
    spyOnProperty(window.navigator, 'userAgent').and.returnValue('AMSIE ');
    isNotIE = false;
    onlyForNoneIE(() => {
      isNotIE = true;
    });
    expect(isNotIE).toEqual(false);
  });
});
