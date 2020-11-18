import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { FormFieldModule } from '../form-field/form-field.module';

import { PhoneNumberEditableFieldComponent } from './phone-number-editable-field.component';

describe('PhoneNumberEditableFieldComponent', () => {
  let component: PhoneNumberEditableFieldComponent;
  let fixture: ComponentFixture<PhoneNumberEditableFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhoneNumberEditableFieldComponent],
      imports: [TestSharedModule, FormFieldModule],
      providers: [SubscriptionService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneNumberEditableFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set hone number', () => {
    component.phone = null;
    expect(component.phone).toEqual(null);
    component.reset();
    expect(component.group.value.confirmPhoneNumber).toEqual({
      code: '+91',
      number: '',
    });
    component.phone = {
      code: 'string',
      number: 'string',
    };
    expect(component.phone).toEqual({
      code: 'string',
      number: 'string',
    });
  });
});
