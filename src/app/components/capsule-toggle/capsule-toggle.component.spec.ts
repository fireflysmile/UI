import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { CapsuleToggleComponent } from './capsule-toggle.component';

describe('CapsuleToggleComponent', () => {
  let component: CapsuleToggleComponent;
  let fixture: ComponentFixture<CapsuleToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CapsuleToggleComponent],
      imports: [TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapsuleToggleComponent);
    component = fixture.componentInstance;
    component.options = [
      {
        label: 'string',
        value: 'string',
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call emit event', () => {
    const spyOnSelectionChange = spyOn(component.selectionChange, 'emit');
    component.selectedValue = 'value';
    component.ngOnInit();
    expect(spyOnSelectionChange).not.toHaveBeenCalled();
    spyOnSelectionChange.calls.reset();

    component.onOptionClick({
      label: 'label',
      value: 'value',
    });
    expect(spyOnSelectionChange).not.toHaveBeenCalled();

    component.onOptionClick({
      label: 'label',
      value: 'newValue',
    });
    expect(spyOnSelectionChange).toHaveBeenCalled();
    spyOnSelectionChange.calls.reset();
  });
});
