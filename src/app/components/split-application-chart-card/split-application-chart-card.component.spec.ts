import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import * as _ from 'lodash';
import { ApplicationService } from 'src/app/services/api/application.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { DonutChartModule } from '../donut-chart/donut-chart.module';
import { RectCardModule } from '../rect-card/rect-card.module';

import { SplitApplicationChartCardComponent } from './split-application-chart-card.component';

const mockChartDatas = [
  {
    label: 'Review Pending',
    value: 1000,
    color: '#76DED9',
  },
  {
    label: 'In-Progress',
    value: 1500,
    color: '#0070D1',
  },
  {
    label: 'Post Checks',
    value: 3000,
    color: '#16325C',
  },
  {
    label: 'Final Approval',
    value: 4000,
    color: '#0DA69E',
  },
];
describe('SplitApplicationChartCardComponent', () => {
  let component: SplitApplicationChartCardComponent;
  let fixture: ComponentFixture<SplitApplicationChartCardComponent>;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SplitApplicationChartCardComponent],
      imports: [DonutChartModule, RectCardModule, TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitApplicationChartCardComponent);
    applicationService = TestBed.inject(ApplicationService);
    component = fixture.componentInstance;
    component.data = _.cloneDeep(mockChartDatas);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not update data if summary is empty', () => {
    spyOn(
      applicationService,
      'getApplicationDetailedSummaries'
    ).and.returnValue(of(null));
    component.data = _.cloneDeep(mockChartDatas);
    component.ngOnInit();
    expect(component.data.length).toEqual(mockChartDatas.length);
  });
});
