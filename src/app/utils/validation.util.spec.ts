import { FormControl, Validators } from '@angular/forms';
import {
  isTimeLt,
  isTimeGt,
  isDefined,
  isValidDate,
  isInteger,
  isFloat,
  isValidString,
  EnhancedRequiredValidator,
  EqualValidators,
  EqualReferenceListener,
  stringContains,
} from './validation.util';

describe('Validation Util', () => {
  it('should check is time lt', () => {
    expect(isTimeLt('11:11', '22:22')).toEqual(true);
    expect(isTimeLt('11:11', '11:11', true)).toEqual(true);
    expect(isTimeLt('11:11', '11:11', false)).toEqual(false);
    expect(isTimeLt('11', '11', true)).toEqual(true);
    expect(isTimeLt('22:22', '11:11', true)).toEqual(undefined);
  });
  it('should check is time gt', () => {
    expect(isTimeGt('11:11', '22:22')).toEqual(undefined);
    expect(isTimeGt('11:11', '11:11', true)).toEqual(true);
    expect(isTimeGt('11:11', '11:11', false)).toEqual(false);
    expect(isTimeGt('11', '11', true)).toEqual(true);
    expect(isTimeGt('22:22', '11:11', true)).toEqual(true);
  });
  it('should check is defined', () => {
    expect(isDefined(undefined)).toEqual(false);
    expect(isDefined(null)).toEqual(false);
    expect(isDefined(234)).toEqual(true);
  });
  it('should check is valid date', () => {
    expect(isValidDate(new Date())).toEqual(true);
    expect(isValidDate('is not a date')).toEqual(false);
  });
  it('should check is integer', () => {
    expect(isInteger('1234')).toEqual(true);
    expect(isInteger('is not an integer')).toEqual(false);
    expect(isInteger(1234)).toEqual(true);
  });
  it('should check is float', () => {
    expect(isFloat('1234')).toEqual(true);
    expect(isFloat('is not an integer')).toEqual(false);
    expect(isFloat(1234)).toEqual(true);
  });
  it('should check is string', () => {
    expect(isValidString('1234')).toEqual(true);
    expect(isValidString(null)).toEqual(false);
  });
  it('should check required validator', () => {
    const control = new FormControl('');
    expect(EnhancedRequiredValidator(null)).toEqual(undefined);
    expect(EnhancedRequiredValidator(control)).toBeTruthy();
  });
  it('should check equal validator', () => {
    const ref = new FormControl('');
    const control = new FormControl('');
    let equalValidator = EqualValidators(null);
    expect(equalValidator(null)).toBeUndefined();
    equalValidator = EqualValidators(ref);
    expect(equalValidator(control)).toBeUndefined();
    control.setValue('test');
    expect(equalValidator(control)).toBeTruthy();
  });
  it('should check equal reference listener', () => {
    const ref = new FormControl('');
    const target = new FormControl('');
    const spyOnSetError = spyOn(target, 'setErrors');
    EqualReferenceListener(ref, target);
    ref.setValue('test');
    expect(spyOnSetError).toHaveBeenCalled();
    spyOnSetError.calls.reset();

    ref.setValue('');
    expect(spyOnSetError).toHaveBeenCalled();
    spyOnSetError.calls.reset();
    target.setValidators([EqualValidators(ref)]);
    ref.setValue('test');
    target.setValue('test');
    spyOnSetError.calls.reset();
    target.setValue('');
    ref.setValue('');
    expect(spyOnSetError).toHaveBeenCalled();
    spyOnSetError.calls.reset();

    target.setValidators([Validators.required]);
    ref.setValue('test');
    target.setValue('test');
    spyOnSetError.calls.reset();
    target.setValue('');
    ref.setValue('');
    expect(spyOnSetError).toHaveBeenCalled();
    spyOnSetError.calls.reset();
  });
  it('should check string contains', () => {
    expect(stringContains(null, null)).toEqual(true);
  });
});
