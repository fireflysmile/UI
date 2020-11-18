import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFilterOptionsComponent } from './dynamic-filter-options.component';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { CheckboxModule } from '../checkbox/checkbox.module';

describe('DynamicFilterOptionsComponent', () => {
  let component: DynamicFilterOptionsComponent;
  let fixture: ComponentFixture<DynamicFilterOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFilterOptionsComponent],
      imports: [TestSharedModule, CheckboxModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFilterOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct filtered options', () => {
    const options = [
      {
        value: 'value1',
        label: 'label1',
        selected: false,
      },
    ];
    component.selected = [
      {
        value: 'value1',
        label: 'label1',
        selected: true,
      },
    ];
    component.options = options;
    expect(component.filteredOptions).toEqual(options);
  });

  it('should emit output event when select change', () => {
    const spyOnSelectedChange = spyOn(component.selectedChange, 'emit');
    const options = [
      {
        value: 'value1',
        label: 'label1',
        selected: false,
      },
    ];
    const selected = [
      {
        value: 'value1',
        label: 'label1',
        selected: true,
      },
    ];
    component.selected = selected;
    component.options = options;
    component.emitSelectedChange();
    expect(spyOnSelectedChange).toHaveBeenCalledWith(selected);
    spyOnSelectedChange.calls.reset();
    component.selected = null;
    component.emitSelectedChange();
    expect(spyOnSelectedChange).toHaveBeenCalledWith(null);
  });
});
