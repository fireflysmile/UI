import { neutralizeEvent, isKey } from './event.util';

describe('Event Util', () => {
  it('should neutralize event', () => {
    neutralizeEvent(null);
    const newEvent = new Event('build');
    const spyOnStop = spyOn(newEvent, 'stopPropagation');
    neutralizeEvent(newEvent);
    expect(spyOnStop).toHaveBeenCalled();
  });

  it('should check correct key', () => {
    const keyBoardEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'Q',
      shiftKey: true,
    });
    expect(isKey(null, null)).toBeFalsy();
    expect(isKey(keyBoardEvent, 'KeyQ')).toBeFalsy();
  });
});
