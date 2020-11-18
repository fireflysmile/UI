import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { NgxMaskModule } from 'ngx-mask';

import { DateInputComponent } from './date-input.component';
import { NgControl, FormControl } from '@angular/forms';

describe('DateInputComponent', () => {
  let component: DateInputComponent;
  let fixture: ComponentFixture<DateInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateInputComponent],
      imports: [TestSharedModule, NgxMaskModule.forRoot()],
    })
      .overrideComponent(DateInputComponent, {
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.focus();
    component.reset();
    expect(component).toBeTruthy();
  });

  it('should set correct value', () => {
    const testDate = new Date(2019, 10, 4);
    component.setStringValue(testDate.toString());
    expect(component.value).toEqual(testDate.toString());

    component.setStringValue('4-10-2019');
    expect(component.value).toEqual('4-10-2019');

    component.minDate = new Date(2019, 10, 4);
    component.setStringValue('4-10-2019');
    expect(component.value).toEqual('4-10-2019');

    component.minDate = new Date(2018, 10, 4);
    component.setStringValue('4-10-2019');
    expect(component.value).toEqual('4-10-2019');

    component.minDate = null;
    component.maxDate = new Date(2018, 10, 4);
    component.setStringValue('4-10-2019');
    expect(component.value).toEqual('4-10-2019');

    component.maxDate = new Date(2028, 10, 4);
    component.setStringValue('4-10-2019');
    expect(component.value).toEqual('4-10-2019');
  });
});
