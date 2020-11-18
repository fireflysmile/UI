import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApprovalColumnModule } from 'src/app/components/approval-column/approval-column.module';
import { ApprovalDocumentItemModule } from 'src/app/components/approval-document-item/approval-document-item.module';
import { ApprovalStatusItemModule } from 'src/app/components/approval-status-item/approval-status-item.module';
import { RectCardModule } from 'src/app/components/rect-card/rect-card.module';
import { StatusTrackerSubHeaderModule } from 'src/app/components/status-tracker-sub-header/status-tracker-sub-header.module';
import { ApplicationService } from 'src/app/services/api/application.service';
import { StatusTrackerService } from 'src/app/services/components/status-tracker.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { PriorApprovalsPageComponent } from './prior-approvals-page.component';

describe('PriorApprovalsPageComponent', () => {
  let component: PriorApprovalsPageComponent;
  let fixture: ComponentFixture<PriorApprovalsPageComponent>;
  let statusTrackerService: StatusTrackerService;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PriorApprovalsPageComponent],
      imports: [
        TestSharedModule,
        StatusTrackerSubHeaderModule,
        ApprovalStatusItemModule,
        ApprovalDocumentItemModule,
        ApprovalColumnModule,
        RectCardModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorApprovalsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    statusTrackerService = TestBed.inject(StatusTrackerService);
    applicationService = TestBed.inject(ApplicationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not get approval if loaded', () => {
    spyOnProperty(statusTrackerService, 'approvalLoaded').and.returnValue(true);
    const spyOnGetApproval = spyOn(applicationService, 'getPriorApprovalDetail');
    component.ngOnInit();
    expect(spyOnGetApproval).not.toHaveBeenCalled();
  });
});
