import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { FormFieldModule } from '../form-field/form-field.module';

import { UserNameEditableFieldComponent } from './user-name-editable-field.component';

describe('UserNameEditableFieldComponent', () => {
  let component: UserNameEditableFieldComponent;
  let fixture: ComponentFixture<UserNameEditableFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserNameEditableFieldComponent],
      imports: [TestSharedModule, FormFieldModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNameEditableFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set name', () => {
    component.firstName = 'firstName';
    component.lastName = 'lastName';
    expect(component.group.value).toEqual({
      firstName: 'firstName',
      lastName: 'lastName',
    });
    component.firstName = null;
    component.lastName = null;
    expect(component.group.value).toEqual({
      firstName: '',
      lastName: '',
    });
  });

  it('should reset value', () => {
    component.reset();
    expect(component.group.value).toEqual({
      firstName: undefined,
      lastName: undefined,
    });
  });
});
