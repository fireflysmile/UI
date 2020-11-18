import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  DynamicFilterQuantityComponent,
  QuantityValue,
} from './dynamic-filter-quantity.component';
import { DividerModule } from '../divider/divider.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';

describe('DynamicFilterQuantityComponent', () => {
  let component: DynamicFilterQuantityComponent;
  let fixture: ComponentFixture<DynamicFilterQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFilterQuantityComponent],
      imports: [DividerModule, TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFilterQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct value when set filter', () => {
    component.filter = null;
    expect(component.type).toEqual('default');
    expect(component.value).toEqual('');
    expect(component.start).toEqual('');
    expect(component.end).toEqual('');

    component.filter = {
      type: 'eq',
      value: null,
    };
    expect(component.type).toEqual('eq');

    component.filter = {
      type: 'eq',
      value: 'newValue',
    };
    expect(component.value).toEqual('newValue');

    component.filter = {
      type: 'eq',
      value: {
        start: 'newStart',
        end: 'newEnd',
      },
    };
    expect(component.start).toEqual('newStart');
    expect(component.end).toEqual('newEnd');
  });

  it('should call output event when filter change', () => {
    const spyOnFilterChange = spyOn(component.filterChange, 'emit');
    component.emitFilterChange();
    expect(spyOnFilterChange).toHaveBeenCalledWith(null);
    spyOnFilterChange.calls.reset();

    let filter: QuantityValue = {
      type: 'range',
      value: {
        start: 'newStart',
        end: 'newEnd',
      },
    };
    component.filter = filter;
    component.emitFilterChange();
    expect(spyOnFilterChange).toHaveBeenCalledWith(filter);
    spyOnFilterChange.calls.reset();

    filter = {
      type: 'range',
      value: {
        start: '',
        end: '',
      },
    };
    component.filter = filter;
    component.emitFilterChange();
    expect(spyOnFilterChange).toHaveBeenCalledWith(null);

    filter = {
      type: 'default',
      value: 'text',
    };
    component.filter = filter;
    component.emitFilterChange();
    expect(spyOnFilterChange).toHaveBeenCalledWith(filter);
    spyOnFilterChange.calls.reset();
  });

  it('should emit event when type change', () => {
    const spyOnEdmitFilterChange = spyOn(component.filterChange, 'emit');
    component.onTypeChange('default');
    expect(spyOnEdmitFilterChange).toHaveBeenCalled();
    spyOnEdmitFilterChange.calls.reset();

    component.onTypeChange('range');
    expect(spyOnEdmitFilterChange).toHaveBeenCalled();
    expect(component.value).toEqual('');
    spyOnEdmitFilterChange.calls.reset();
  });
});
