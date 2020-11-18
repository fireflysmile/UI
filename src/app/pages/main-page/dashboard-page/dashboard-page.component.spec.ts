import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationChartCardModule } from 'src/app/components/application-chart-card/application-chart-card.module';
import { LastMonthApplicationsModule } from 'src/app/components/last-month-applications/last-month-applications.module';
import { MemberApplicationTableModule } from 'src/app/components/member-application-table/member-application-table.module';
import { PageContentModule } from 'src/app/components/page-content/page-content.module';
import { PageTitleModule } from 'src/app/components/page-title/page-title.module';
import { SplitApplicationsModule } from 'src/app/components/split-applications/split-applications.module';
import { AppService } from 'src/app/services/components/app.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { DashboardPageComponent } from './dashboard-page.component';

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;
  let appService: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardPageComponent],
      imports: [
        TestSharedModule,
        PageTitleModule,
        SplitApplicationsModule,
        MemberApplicationTableModule,
        PageContentModule,
        ApplicationChartCardModule,
        LastMonthApplicationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    appService = TestBed.inject(AppService);
    appService.userInfo = {
      role: 'RO',
      checker: false,
    };
    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
