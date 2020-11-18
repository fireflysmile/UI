import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableFormFieldBaseComponent } from './editable-form-field-base.component';

describe('EditableFormFieldBaseComponent', () => {
  let component: EditableFormFieldBaseComponent<string>;
  let fixture: ComponentFixture<EditableFormFieldBaseComponent<string>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditableFormFieldBaseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      EditableFormFieldBaseComponent
    ) as ComponentFixture<EditableFormFieldBaseComponent<string>>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
