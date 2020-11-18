import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BackButtonModule } from 'src/app/components/back-button/back-button.module';
import { SplitApplicationChartCardModule } from 'src/app/components/split-application-chart-card/split-application-chart-card.module';
import {
  SplitApplicationDetailedSummaryModule
} from 'src/app/components/split-application-detailed-summary/split-application-detailed-summary.module';
import { SplitApplicationTableModule } from 'src/app/components/split-application-table/split-application-table.module';
import { ApplicationService } from 'src/app/services/api/application.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { SplitApplicationPageComponent } from './split-application-page.component';

describe('SplitApplicationPageComponent', () => {
  let component: SplitApplicationPageComponent;
  let fixture: ComponentFixture<SplitApplicationPageComponent>;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SplitApplicationPageComponent],
      imports: [
        TestSharedModule,
        BackButtonModule,
        SplitApplicationChartCardModule,
        SplitApplicationDetailedSummaryModule,
        SplitApplicationTableModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitApplicationPageComponent);
    applicationService = TestBed.inject(ApplicationService);
    spyOn(
      applicationService,
      'getApplicationDetailedSummaries'
    ).and.returnValue(
      of({
        applicationUnderReview: {
          reviewPending: 3000,
          inProgress: 4000,
        },
        applicationCompleted: {
          finalApprovals: 1500,
          postChecks: 1510,
        },
      })
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
