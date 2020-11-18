import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFilterTimesComponent } from './dynamic-filter-times.component';
import { TimeSelectorModule } from '../time-selector/time-selector.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { DividerModule } from '../divider/divider.module';

describe('DynamicFilterTimesComponent', () => {
  let component: DynamicFilterTimesComponent;
  let fixture: ComponentFixture<DynamicFilterTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFilterTimesComponent],
      imports: [TimeSelectorModule, TestSharedModule, DividerModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFilterTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct value when set value', () => {
    component.value = null;
    expect(component.start).toEqual('');
    expect(component.end).toEqual('');

    component.value = {
      start: null,
      end: null,
    };
    expect(component.start).toEqual('');
    expect(component.end).toEqual('');

    component.value = {
      start: 'newStart',
      end: 'newEnd',
    };
    expect(component.start).toEqual('newStart');
    expect(component.end).toEqual('newEnd');
  });

  it('should call output value when time change', () => {
    const spyOnValueChange = spyOn(component.valueChange, 'emit');
    component.onTimeChange('start', 'invalidDate');
    expect(spyOnValueChange).toHaveBeenCalledWith({
      start: 'invalidDate',
      end: '',
    });
    spyOnValueChange.calls.reset();

    component.onTimeChange('end', 'invalidDate');
    expect(spyOnValueChange).toHaveBeenCalledWith({
      start: 'invalidDate',
      end: 'invalidDate',
    });
    spyOnValueChange.calls.reset();

    component.onTimeChange('start', '');
    component.onTimeChange('end', '');
    expect(spyOnValueChange).toHaveBeenCalledWith(null);
    spyOnValueChange.calls.reset();

    const testTime = '10:25';
    component.end = '8:35';
    component.onTimeChange('start', testTime);
    expect(component.start).toEqual('');

    component.start = '12:35';
    component.onTimeChange('end', testTime);
    expect(component.end).toEqual('');
    expect(spyOnValueChange).toHaveBeenCalled();
    spyOnValueChange.calls.reset();
  });
});
