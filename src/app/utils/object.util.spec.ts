import {
  getObjectValue,
  noneArrayToArray,
  setObjectValue,
} from './object.util';

describe('Object Util', () => {
  it('should get object value', () => {
    expect(
      getObjectValue(
        {
          test1: 'test2',
        },
        'test1'
      )
    ).toEqual('test2');
    expect(
      getObjectValue(
        {
          test1: 'test2',
        },
        'test3'
      )
    ).toEqual(undefined);
    expect(
      getObjectValue(
        {
          test1: null,
          test2: null,
          test3: null,
        },
        'tes2t3.test4.test4'
      )
    ).toEqual(undefined);
  });
  it('should set object value', () => {
    const object = {
      test1: 'test2',
      test2: null,
    };

    setObjectValue(object, 'test2.test4', 'test3');
    expect(object).toEqual({
      test1: 'test2',
      test2: null,
    });
  });
  it('should convert none array to array', () => {
    expect(noneArrayToArray('')).toEqual('');
    expect(noneArrayToArray('ti')).toEqual(['t', 'i']);
  });
});
