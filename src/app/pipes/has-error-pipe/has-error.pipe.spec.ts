import { HasErrorPipe } from './has-error.pipe';
import { FormControl, Validators } from '@angular/forms';

describe('HasErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new HasErrorPipe();
    expect(pipe).toBeTruthy();
  });
  it('should return correct form control state', () => {
    const control = new FormControl('', Validators.required);
    const pipe = new HasErrorPipe();
    expect(pipe.transform(control, 'error')).toEqual(false);
    control.markAsDirty();
    expect(pipe.transform(control, 'error')).toEqual(false);
  });
});
