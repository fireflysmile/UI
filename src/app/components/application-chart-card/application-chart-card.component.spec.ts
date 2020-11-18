import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { ApplicationChartFiltersModule } from '../application-chart-filters/application-chart-filters.module';
import { MultiSelectModule } from '../multi-select/multi-select.module';
import { RectCardModule } from '../rect-card/rect-card.module';
import { StackedBarChartModule } from '../stacked-bar-chart/stacked-bar-chart.module';

import { ApplicationChartCardComponent } from './application-chart-card.component';

describe('ApplicationChartCardComponent', () => {
  let component: ApplicationChartCardComponent;
  let fixture: ComponentFixture<ApplicationChartCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationChartCardComponent],
      imports: [
        ApplicationChartFiltersModule,
        StackedBarChartModule,
        TestSharedModule,
        MultiSelectModule,
        RectCardModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter', () => {
    let newFilters = {
      months: ['January', 'February', 'March'],
      requests: ['Key Approvals', 'Mandatory Submissions'],
    };
    component.filters = newFilters;
    expect(component.filters).toEqual(newFilters);
    component.filters = newFilters;
    expect(component.filters).toEqual(newFilters);

    newFilters = {
      months: ['January', 'February', 'March'],
      requests: [
        'Key Approvals',
        'Mandatory Submissions',
        'Mandatory Submissions 2',
      ],
    };
    (component as any)._colors = null;
    component.filters = newFilters;
    expect(component.filters).toEqual(newFilters);
  });
});
