import {
  randomDate,
  randomPick,
  randomNumber,
  randomGaussianNumber,
  randomKey,
} from './random.util';

describe('Random Util', () => {
  it('should random date', () => {
    const startDate = new Date(1010, 7, 5);
    const endDate = new Date(3011, 7, 5);
    expect(randomDate(startDate, endDate).getTime()).toBeLessThan(
      endDate.getTime()
    );
    expect(randomDate(null, null).getTime()).toBeLessThan(endDate.getTime());
  });

  it('should random pick', () => {
    expect([3, 4, 5, 6].indexOf(randomPick([3, 4, 5, 6])) >= 0).toEqual(true);
  });

  it('should random number', () => {
    expect(randomNumber(23, 100) <= 100).toEqual(true);
    expect(randomGaussianNumber(23, 100) <= 100).toEqual(true);
  });

  it('should random key', () => {
    expect(randomKey()).toBeTruthy();
  });
});
