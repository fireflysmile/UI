import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { FormFieldModule } from '../form-field/form-field.module';

import { EmailIdEditableFieldComponent } from './email-id-editable-field.component';

describe('EmailIdEditableFieldComponent', () => {
  let component: EmailIdEditableFieldComponent;
  let fixture: ComponentFixture<EmailIdEditableFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmailIdEditableFieldComponent],
      imports: [TestSharedModule, FormFieldModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailIdEditableFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update email', () => {
    component.emailId = 'testEmailId';
    expect(component.emailId).toEqual('testEmailId');
    component.emailId = null;
    expect(component.emailId).toEqual(null);
    component.emailId = 'testEmailId';
    component.reset();
    expect(component.emailId).toEqual('testEmailId');
  });
});
