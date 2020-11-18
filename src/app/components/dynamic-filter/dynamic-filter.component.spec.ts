import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFilterComponent } from './dynamic-filter.component';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { DynamicFilterQuantityModule } from '../dynamic-filter-quantity/dynamic-filter-quantity.module';
import { DynamicFilterDatesModule } from '../dynamic-filter-dates/dynamic-filter-dates.module';
import { DynamicFilterTimesModule } from '../dynamic-filter-times/dynamic-filter-times.module';
import { DynamicFilterOptionsModule } from '../dynamic-filter-options/dynamic-filter-options.module';
import { AutoCloserModule } from '../auto-closer/auto-closer.module';
import { PositionFixerModule } from '../position-fixer/position-fixer.module';

describe('DynamicFilterComponent', () => {
  let component: DynamicFilterComponent;
  let fixture: ComponentFixture<DynamicFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFilterComponent],
      imports: [
        TestSharedModule,
        CheckboxModule,
        DynamicFilterQuantityModule,
        DynamicFilterDatesModule,
        DynamicFilterTimesModule,
        DynamicFilterOptionsModule,
        AutoCloserModule,
        PositionFixerModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.onWindowResize();
    expect(component).toBeTruthy();
  });

  it('should open modal when click input', () => {
    component.filter = {};
    component.openModal();
    expect(component.opened).toEqual(true);

    component.filter = { test: 'test'};
    component.openModal();
    expect(component.opened).toEqual(true);

    component.filtered = true;
    component.openModal();
    expect(component.value).toEqual('');
  });

  it('should close modal when run closeModal', () => {
    const spyOnFilterClose = spyOn(component.filterClose, 'emit');
    component.filter = {};
    component.closeModal();
    component.filter = null;
    component.closeModal();
    expect(spyOnFilterClose).toHaveBeenCalledTimes(2);
  });

  it('should clear filter when click clear filter', () => {
    const spyOnFilterChange = spyOn(component.filterChange, 'emit');
    component.clearFilter();
    expect(spyOnFilterChange).toHaveBeenCalledTimes(1);
  });

  it('should set scroll left', () => {
    component.scrollLeft = 10;
    expect(component.onLeftEnd).toEqual(true);
  });

  it('should set container width', () => {
    component.inputRef = null;
    component.containerWidth = 10;
    expect(component.inputWidth).toEqual(0);
  });
});
