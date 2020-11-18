import { fakeAsync, tick } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { YEAR_MILLS } from 'src/app/utils/date.util';
import { TimePassedPipe } from './time-passed.pipe';

describe('TimePassedPipe', () => {
  it('create an instance', () => {
    const pipe = new TimePassedPipe();
    expect(pipe).toBeTruthy();
    pipe.ngOnDestroy();
  });

  it('should get correct time without sync', fakeAsync(() => {
    const pipe = new TimePassedPipe();
    //
    expect(pipe.transform(null, null, null, null, false)).toEqual(undefined);
    expect(
      pipe.transform(
        new Date(2010, 7, 5),
        new Date(2010, 7, 5),
        'minify',
        'current',
        false
      )
    ).toEqual(undefined);

    const today = new Date(2010, 7, 5);
    let nextDate = new Date(today);
    nextDate.setDate(nextDate.getDate() + 1000);
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'minify', 'current', false)
    ).toEqual('2y');
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'ellipsis', 'next', false)
    ).toEqual('2yrs 9mths');
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'full', 'full', false)
    ).toEqual('2 Years 9 Months');
    nextDate = new Date(today);
    nextDate.setDate(nextDate.getDate() + 367);
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'full', 'full', false)
    ).toEqual('1 Year');
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'ellipsis', 'next', false)
    ).toEqual('1yr');
    expect(
      pipe.transform(
        new Date(2010, 7, 5).toString(),
        nextDate.toString(),
        'ellipsis',
        'next',
        false
      )
    ).toEqual('1yr');

    nextDate = new Date(today);
    nextDate.setDate(nextDate.getDate() + YEAR_MILLS);
    expect(
      pipe.transform(today, nextDate, 'full', 'full', false)
    ).toEqual(undefined);

    nextDate = new Date(today);
    nextDate.setDate(nextDate.getDate() + 100);
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'minify', 'current', false)
    ).toEqual('3m');

    nextDate = new Date(today);
    nextDate.setDate(nextDate.getDate() + 100);
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'minify', 'full', false)
    ).toEqual('3m');
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'minify', 'next', false)
    ).toEqual('3m');

    nextDate = new Date(today);
    nextDate.setTime(nextDate.getTime() + 25 * 60 * 60 * 1000);
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'full', 'full', false)
    ).toEqual('1 Day 1 Hour 0 second');
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'ellipsis', 'full', false)
    ).toEqual('1day 1hr 0sec');
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'ellipsis', 'next', false)
    ).toEqual('1day 1hr');
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'minify', 'next', false)
    ).toEqual('1d 1h');
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'minify', 'current', false)
    ).toEqual('1d');

    nextDate = new Date(today);
    nextDate.setTime(nextDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'full', 'full', false)
    ).toEqual('3 Days 0 second');
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'ellipsis', 'full', false)
    ).toEqual('3days 0sec');

    nextDate = new Date(today);
    nextDate.setTime(nextDate.getTime() + 23 * 60 * 60 * 1000);
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'full', 'full', false)
    ).toEqual('23 Hours 0 second');
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'ellipsis', 'next', false)
    ).toEqual('23hrs undefined');
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'minify', 'next', false)
    ).toEqual('23h undefined');

    nextDate = new Date(2010, 7, 5);
    nextDate.setTime(nextDate.getTime() + 60 * 1000);
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'full', 'full', false)
    ).toEqual('1 Minute 0 second');

    nextDate = new Date(2010, 7, 5);
    nextDate.setTime(nextDate.getTime() + 60 * 2 * 1000);
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'full', 'full', false)
    ).toEqual('2 Minutes 0 second');

    nextDate = new Date(2010, 7, 5);
    nextDate.setTime(nextDate.getTime() + 60 * 2 * 1000);
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'ellipsis', 'full', false)
    ).toEqual('2mins 0sec');

    nextDate = new Date(2010, 7, 5);
    nextDate.setTime(nextDate.getTime() + 60 * 1000);
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'full', 'next', false)
    ).toEqual('1 Minute 0 second');

    nextDate = new Date(2010, 7, 5);
    nextDate.setTime(nextDate.getTime() + 60 * 1000);
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'minify', 'next', false)
    ).toEqual('1m');

    nextDate = new Date(2010, 7, 5);
    nextDate.setTime(nextDate.getTime() + 40 * 1000);
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'full', 'full', false)
    ).toEqual('40 Seconds');

    nextDate = new Date(2010, 7, 5);
    nextDate.setTime(nextDate.getTime() + 40 * 1000);
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'ellipsis', 'full', false)
    ).toEqual('40secs');

    nextDate = new Date(2010, 7, 5);
    nextDate.setTime(nextDate.getTime() + 40 * 1000);
    expect(
      pipe.transform(new Date(2010, 7, 5), nextDate, 'minify', 'full', false)
    ).toEqual('40s');

    expect(pipe.transform()).toBeTruthy();
    expect(pipe.transform(new Date(2010, 7, 5), nextDate)).toBeTruthy();

    (pipe.transform(
      new Date(2010, 7, 5),
      nextDate,
      'ellipsis',
      'full',
      true
    ) as Observable<string>).subscribe((rs) => {
      expect(rs).toBeTruthy();
    });
    tick(2000);
    pipe.ngOnDestroy();
    tick(2000);
  }));
});
