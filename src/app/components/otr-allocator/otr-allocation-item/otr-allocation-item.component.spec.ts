import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { FormFieldModule } from '../../form-field/form-field.module';
import { SelectModule } from '../../select/select.module';

import { OtrAllocationItemComponent } from './otr-allocation-item.component';

describe('OtrAllocationItemComponent', () => {
  let component: OtrAllocationItemComponent;
  let fixture: ComponentFixture<OtrAllocationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtrAllocationItemComponent],
      imports: [TestSharedModule, SelectModule, FormFieldModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrAllocationItemComponent);
    component = fixture.componentInstance;
    component.data = {
      pcCode: 'string',
      allocatedQty: 'string',
      allocatedValue: 'string',
      contactNoteNumber: 'string',
      confirmed: false,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check valid', () => {
    expect(component.valid).toBeTruthy();
  });

  it('should remove unnecessary charts on in put', () => {
    const eventObject = {
      target: {
        value: 'test123',
      },
    };
    component.removeUnnecessaryCharsOnInput(eventObject as any);
    expect(eventObject.target.value).toEqual('123');
  });

  it('should check error state when value change', () => {
    const spyOnSetErrors = spyOn(component.qtyRef.control, 'setErrors');
    component.onQtyChange('test1');
    component.onValueChange('test2');
    expect(spyOnSetErrors).toHaveBeenCalled();
    spyOnSetErrors.calls.reset();

    const spyOnValueRef = spyOnProperty(
      component.valueRef,
      'value'
    ).and.returnValue('test0');
    const spyOnQtyRef = spyOnProperty(
      component.qtyRef,
      'value'
    ).and.returnValue('test123');
    component.onValueChange('test0');
    expect(spyOnSetErrors).toHaveBeenCalled();
    spyOnSetErrors.calls.reset();

    spyOnValueRef.and.returnValue('test123');
    spyOnQtyRef.and.returnValue('test0');
    component.onValueChange('test0');
    expect(spyOnSetErrors).toHaveBeenCalled();
    spyOnSetErrors.calls.reset();

    component.clearErrors();
    expect(spyOnSetErrors).toHaveBeenCalledWith(null);
    spyOnSetErrors.calls.reset();
  });
});
