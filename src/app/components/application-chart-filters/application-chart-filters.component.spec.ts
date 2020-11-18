import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl, FormControl } from '@angular/forms';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { FormFieldModule } from '../form-field/form-field.module';
import { MultiSelectModule } from '../multi-select/multi-select.module';

import { ApplicationChartFiltersComponent } from './application-chart-filters.component';

describe('ApplicationChartFiltersComponent', () => {
  let component: ApplicationChartFiltersComponent;
  let fixture: ComponentFixture<ApplicationChartFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationChartFiltersComponent],
      imports: [TestSharedModule, MultiSelectModule, FormFieldModule],
    })
      .overrideComponent(ApplicationChartFiltersComponent, {
        add: {
          providers: [
            {
              provide: NgControl,
              useClass: class extends NgControl {
                control = new FormControl();
                viewToModelUpdate() {}
              },
            },
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationChartFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default value', () => {
    component.writeValue(null);
    expect(component.group.value).toEqual({
      months: [],
      requests: [],
    });
    component.writeValue({
      months: null,
      requests: null,
    });
    expect(component.group.value).toEqual({
      months: [],
      requests: [],
    });
  });
});
