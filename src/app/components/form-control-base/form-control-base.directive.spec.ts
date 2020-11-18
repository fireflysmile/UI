import {
  ChangeDetectorRef,
  Component,
  DebugElement,
  ViewChild,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControlBaseDirective } from './form-control-base.directive';
import { NgControl, FormControl } from '@angular/forms';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { ApplicationChartFilters } from '../application-chart-filters/application-chart-filters.component';

@Component({
  template: `<div
    #cdire="appFormControlBaseDirective"
    appFormControlBase
  ></div>`,
})
class TestDirectiveComponent {
  @ViewChild('cdire', { static: true }) element: FormControlBaseDirective<
    string
  >;
}

@Component({
  selector: 'app-test-empty-component',
  template: `<div></div>`,
})
export class TestEmptyComponent extends FormControlBaseDirective<
  ApplicationChartFilters
> {
  constructor(protected changeDetectorRef: ChangeDetectorRef) {
    super(null, changeDetectorRef);
  }
}

describe('FormControlBaseDirective', () => {
  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;
  let componentEmpty: TestEmptyComponent;
  let fixtureEmpty: ComponentFixture<TestEmptyComponent>;
  let elementRef: DebugElement;
  const event: any = {};
  let ngControl: NgControl;

  beforeEach(() => {
    document.addEventListener = (eventName, action) => {
      event[eventName] = action;
    };
    TestBed.configureTestingModule({
      declarations: [
        TestDirectiveComponent,
        FormControlBaseDirective,
        TestEmptyComponent,
      ],
      imports: [TestSharedModule],
    })
      .overrideDirective(FormControlBaseDirective, {
        add: {
          providers: [
            {
              provide: NgControl,
              useClass: class extends NgControl {
                control = new FormControl();
                viewToModelUpdate() {}
              },
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDirectiveComponent);
    component = fixture.componentInstance;
    fixtureEmpty = TestBed.createComponent(TestEmptyComponent);
    componentEmpty = fixtureEmpty.componentInstance;
    fixture.detectChanges();
    elementRef = fixture.debugElement.query(By.css('div'));

    ngControl = component.element.ngControl;
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
    expect(componentEmpty).toBeTruthy();
  });

  it('should set value to form control', () => {
    const spyOnFormControl = spyOn(ngControl.control, 'setValue');
    component.element.setValue('newValue');
    expect(spyOnFormControl).toHaveBeenCalledWith('newValue');
  });

  it('should set disable to form control', () => {
    const spyOnFormControl = spyOn(ngControl.control, 'disable');
    component.element.setDisable();
    expect(spyOnFormControl).toHaveBeenCalled();

    spyOnProperty(component.element, 'hasControl').and.returnValue(false);
    expect(component.element.disabled).toEqual(undefined);
    expect(component.element.hasError).toEqual(undefined);
  });

  it('should set enable to form control', () => {
    const spyOnFormControl = spyOn(ngControl.control, 'enable');
    component.element.setEnable();
    expect(spyOnFormControl).toHaveBeenCalled();
  });

  it('should set errors to form control', () => {
    const spyOnFormControl = spyOn(ngControl.control, 'setErrors');
    component.element.setErrors([]);
    expect(spyOnFormControl).toHaveBeenCalled();
  });

  it('should register on change', () => {
    let isCalledOnChange = false;
    const onChange = () => {
      isCalledOnChange = true;
    };
    component.element.registerOnChange(null);
    component.element.markAsDirty();
    expect(isCalledOnChange).toBeFalsy();

    component.element.setDisabledState(true);
    component.element.registerOnChange(onChange);
    component.element.markAsDirty();
    expect(isCalledOnChange).toBeTruthy();
  });

  it('should register on touch', () => {
    let isCalledOnTouch = false;
    const onTouch = () => {
      isCalledOnTouch = true;
    };
    component.element.registerOnTouched(null);
    component.element.markAsTouched();
    expect(isCalledOnTouch).toBeFalsy();

    component.element.registerOnTouched(onTouch);
    component.element.markAsTouched();
    expect(isCalledOnTouch).toBeTruthy();
  });

  it('should get correct error', () => {
    component.element.setErrors({
      error1: 'error1',
      error2: 'error2',
    });
    expect(component.element.getErrors()).toEqual({
      error1: 'error1',
      error2: 'error2',
    });
    component.element.setErrors(null);
    expect(component.element.getErrors()).toEqual({});

    expect(component.element.hasError).toBeFalsy();
    spyOnProperty(ngControl.control, 'invalid').and.returnValue(true);
    expect(component.element.hasError).toBeFalsy();
  });
});
