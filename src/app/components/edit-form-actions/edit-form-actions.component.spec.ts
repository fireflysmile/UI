import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { CardActionItemModule } from '../card-action-item/card-action-item.module';

import { EditFormActionsComponent } from './edit-form-actions.component';

describe('EditFormActionsComponent', () => {
  let component: EditFormActionsComponent;
  let fixture: ComponentFixture<EditFormActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditFormActionsComponent],
      imports: [TestSharedModule, CardActionItemModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit correct event', () => {
    const spyOnEdit = spyOn(component.edit, 'emit');
    const spyOnCancel = spyOn(component.cancel, 'emit');
    const spyOnSave = spyOn(component.save, 'emit');
    component.onEdit();
    component.onCancel();
    component.onSave();
    expect(spyOnEdit).toHaveBeenCalled();
    expect(spyOnCancel).toHaveBeenCalled();
    expect(spyOnSave).toHaveBeenCalled();
  });
});
