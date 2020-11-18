import { Nl2brPipe } from './nl2br.pipe';

describe('Nl2brPipe', () => {
  it('create an instance', () => {
    const pipe = new Nl2brPipe();
    expect(pipe).toBeTruthy();
  });

  it('transform nl to br', () => {
    const pipe = new Nl2brPipe();
    expect(pipe.transform('a\nb')).toEqual('a<br/>b');
  });

  it('return empty string', () => {
    const pipe = new Nl2brPipe();
    expect(pipe.transform(null)).toEqual('');
  });
});
