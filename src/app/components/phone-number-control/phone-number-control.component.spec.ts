import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl, FormControl } from '@angular/forms';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { SelectModule } from '../select/select.module';

import { PhoneNumberControlComponent } from './phone-number-control.component';

describe('PhoneNumberControlComponent', () => {
  let component: PhoneNumberControlComponent;
  let fixture: ComponentFixture<PhoneNumberControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhoneNumberControlComponent],
      imports: [TestSharedModule, SelectModule],
    })
      .overrideComponent(PhoneNumberControlComponent, {
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
    fixture = TestBed.createComponent(PhoneNumberControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write value', () => {
    component.writeValue(null);
    expect(component.code).toEqual('+91');
    component.writeValue({
      code: null,
      number: null,
    });
    expect(component.code).toEqual('+91');

    const spyOnSetValue = spyOn(component, 'setValue');
    component.setPhoneValue();
    expect(spyOnSetValue).toHaveBeenCalled();
  });
});
