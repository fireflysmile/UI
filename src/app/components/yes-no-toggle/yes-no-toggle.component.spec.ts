import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CardActionItemModule } from '../card-action-item/card-action-item.module';

import { YesNoToggleComponent } from './yes-no-toggle.component';

describe('YesNoToggleComponent', () => {
  let component: YesNoToggleComponent;
  let fixture: ComponentFixture<YesNoToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YesNoToggleComponent],
      imports: [CardActionItemModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNoToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call toggle event', () => {
    const spyOnToggle = spyOn(component.toggle, 'emit');
    component.disabled = true;
    component.onToggle('Yes');
    expect(spyOnToggle).not.toHaveBeenCalled();

    component.disabled = false;
    component.value = 'Yes';
    component.onToggle('Yes');
    expect(spyOnToggle).not.toHaveBeenCalled();

    component.disabled = false;
    component.value = 'No';
    component.onToggle('Yes');
    expect(spyOnToggle).toHaveBeenCalled();
  });
});
