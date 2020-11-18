import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';

import { FormErrorComponent } from './form-error.component';

describe('FormErrorComponent', () => {
  let component: FormErrorComponent;
  let fixture: ComponentFixture<FormErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormErrorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check error', () => {
    component.control = new FormControl('', [Validators.required]);
    expect(component.hasError).toBeFalsy();
    component.errorCode = 'required';
    expect(component.hasError).toBeFalsy();
    component.suppressOn = 'erro2';
    component.control.markAsTouched();
    expect(component.hasError).toBeTruthy();
    expect(component.display).toEqual('block');
    component.control.markAsUntouched();
    component.control.markAsDirty();
    expect(component.hasError).toBeTruthy();

  });
});
