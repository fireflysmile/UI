import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoSizeTextareaModule } from 'src/app/components/auto-size-textarea/auto-size-textarea.module';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { PreviewPdfModule } from 'src/app/components/preview-pdf/preview-pdf.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { CheckerCommentsComponent } from '../checker-comments/checker-comments.component';
import { LetterAttachmentCellComponent } from '../letter-attachment-cell/letter-attachment-cell.component';

import { PriorApprovalTableComponent } from './prior-approval-table.component';

describe('PriorApprovalTableComponent', () => {
  let component: PriorApprovalTableComponent;
  let fixture: ComponentFixture<PriorApprovalTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PriorApprovalTableComponent,
        LetterAttachmentCellComponent,
        CheckerCommentsComponent,
      ],
      imports: [
        TestSharedModule,
        PreviewPdfModule,
        ModalModule,
        AutoSizeTextareaModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorApprovalTableComponent);
    component = fixture.componentInstance;
    component.priorApproval = {
      accepted: false,
      approvalLetter: {
        name: 'name',
        url: 'url',
      },
      rejectionReason: 'rejection reason',
      comments: [{ text: 'comment', date: new Date(2010, 7, 5), seen: false }],
      status: 'status',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
