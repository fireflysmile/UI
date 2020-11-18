import {
  sortMethodAsc,
  sortMethodWithOrder,
  sortMethodWithOrderMultiColumn,
} from './sort.util';

describe('Sort Util', () => {
  it('should sort method with order', () => {
    const sortMethod = sortMethodWithOrder('desc');
    expect(sortMethod(3, 5)).toEqual(1);
    expect(sortMethod(5, 3)).toEqual(-1);
    expect(sortMethod(3, 3)).toEqual(-0);
  });

  it('should sort method with order multi column', () => {
    let sortedFunc = sortMethodWithOrderMultiColumn(null);
    sortedFunc = sortMethodWithOrderMultiColumn([
      {
        property: 'prop1',
        order: 'asc',
      },
    ]);
    expect(
      sortedFunc(
        {
          prop1: 'test1',
        },
        {
          prop1: 'test2',
        }
      )
    ).toEqual(-1);
    expect(
      sortedFunc(
        {
          prop1: null,
        },
        {
          prop1: null,
        }
      )
    ).toEqual(0);
    expect(
      sortedFunc(
        {
          prop1: 1,
        },
        {
          prop1: 1,
        }
      )
    ).toEqual(0);
    expect(
      sortedFunc(
        {
          prop1: new Date(1010, 7, 5),
        },
        {
          prop1: new Date(1010, 7, 5),
        }
      )
    ).toEqual(0);
  });
});
