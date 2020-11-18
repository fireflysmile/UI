import { TsRow } from './ts-row';

describe('TsRow', () => {
  it('should create TsRow', () => {
    const tsRow = new TsRow<string>('Application submitted on');
    expect(tsRow).toBeTruthy();
  });
});
