import {toSplitTime} from './format.util';
import {AbstractControl, FormControl} from '@angular/forms';
import {isEqual} from 'lodash-es';
import {Subscription} from 'rxjs';

/**
 * return true when string value is valid
 * if value is not string, just check existence
 * @param value string value to check
 */
export function isValidString(value: string): boolean {
  if (typeof value === 'string') {
    return !!(value && value.trim());
  } else {
    return !!value;
  }
}

/**
 * return true when value is float format
 * @param value value
 */
export function isFloat(value: string | number): boolean {
  const floatReg = /^(([+-])?(0|([1-9][0-9]*))(\.[0-9]+)?)$/gm;

  return !!floatReg.exec(typeof value === 'string' ? value : value.toString());
}

/**
 * return true when value is integer format
 * @param value value
 */
export function isInteger(value: string | number): boolean {
  const integerReg = /^[+-]?[0-9]+$/gm;

  return !!integerReg.exec(typeof value === 'string' ? value : value.toString());
}


/**
 * return true when value is date format
 * @param value value
 */
export function isValidDate(value: string | number | Date): boolean {
  return !isNaN(new Date(value).getTime());
}

/**
 * return true when value is not undefined and not null
 * @param value value
 */
export function isDefined(value: any): boolean {
  return value !== undefined && value !== null;
}

/**
 * return true when time is greater than comparison
 * @param target target time
 * @param comparison comparison time
 * @param eq allow equals
 */
export function isTimeGt(target: string, comparison: string, eq = false): boolean {
  const targetSplit = toSplitTime(target);
  const comparisonSplit = toSplitTime(comparison);

  if (targetSplit.length === 2 && comparisonSplit.length === 2) {
    const [targetHour, targetMinute] = targetSplit;
    const [comparisonHour, comparisonMinute] = comparisonSplit;

    if (targetHour >= comparisonHour) {
      if (targetHour === comparisonHour) {
        return eq ? targetMinute >= comparisonMinute : targetMinute > comparisonMinute;
      } else {
        return true;
      }
    }
  } else {
    return true;
  }
}

/**
 * return true when time is less than comparison
 * @param target target time
 * @param comparison comparison time
 * @param eq allow equals
 */
export function isTimeLt(target: string, comparison: string, eq = false): boolean {
  const targetSplit = toSplitTime(target);
  const comparisonSplit = toSplitTime(comparison);

  if (targetSplit.length === 2 && comparisonSplit.length === 2) {
    const [targetHour, targetMinute] = targetSplit;
    const [comparisonHour, comparisonMinute] = comparisonSplit;

    if (targetHour <= comparisonHour) {
      if (targetHour === comparisonHour) {
        return eq ? targetMinute <= comparisonMinute : targetMinute < comparisonMinute;
      } else {
        return true;
      }
    }
  } else {
    return true;
  }
}

/**
 * enhanced required validator
 * @param control control
 */
export function EnhancedRequiredValidator(control: FormControl | AbstractControl): any {
  if (control && !(control.value || '').trim()) {
    return {
      required: {
        value: control.value,
      },
    };
  }
}

/**
 * check whether value is equal or not
 * @param ref referenced control
 */
export function EqualValidators(ref: FormControl | AbstractControl): any {
  return control => {
    if (ref && control) {
      if (!isEqual(ref.value, control.value)) {
        return {
          equal: {
            value: control.value,
          },
        };
      }
    }
  };
}

/**
 * the listener for equal validation referenced control
 * @param ref referenced control
 * @param target target control to check equal validation
 */
export function EqualReferenceListener(ref: FormControl | AbstractControl, target: FormControl | AbstractControl): Subscription {
  return ref.valueChanges.subscribe(value => {
    if (isEqual(value, target.value)) {
      const errors = target.errors;

      if (errors && errors.hasOwnProperty('equal')) {
        delete errors.equal;
      }

      target.setErrors(Object.keys(errors || {}).length > 0 ? errors : null);
    } else {
      target.setErrors({
        ...target.errors,
        equal: {
          value: target.value,
        },
      });
    }
  });
}

/**
 * return true when target contains search
 * @param target target string
 * @param search search string
 */
export function stringContains(target: string, search: string): boolean {
  return (target || '').toLowerCase().indexOf((search || '').toLowerCase()) !== -1;
}
