import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoSizeTextareaModule } from 'src/app/components/auto-size-textarea/auto-size-textarea.module';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { PreviewPdfModule } from 'src/app/components/preview-pdf/preview-pdf.module';
import { SelectModule } from 'src/app/components/select/select.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { CheckerCommentsComponent } from '../checker-comments/checker-comments.component';
import { LetterAttachmentCellComponent } from '../letter-attachment-cell/letter-attachment-cell.component';

import { PostFactoApprovalTableComponent } from './post-facto-approval-table.component';

describe('PostFactoApprovalTableComponent', () => {
  let component: PostFactoApprovalTableComponent;
  let fixture: ComponentFixture<PostFactoApprovalTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostFactoApprovalTableComponent,
        LetterAttachmentCellComponent,
        CheckerCommentsComponent,
      ],
      imports: [
        TestSharedModule,
        SelectModule,
        PreviewPdfModule,
        ModalModule,
        AutoSizeTextareaModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFactoApprovalTableComponent);
    component = fixture.componentInstance;
    component.postFactoApproval = {
      accepted: false,
      warningLetter: {
        name: 'name',
        url: 'url',
      },
      rejectionReason: 'rejection reason',
      warningCancellationReason: 'warning reason',
      comments: [{ text: 'comment', date: new Date(2010, 7, 5), seen: false }],
      checkerConfirmation: false,
      status: 'status',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update warning when change', () => {
    component.warningCancellationReasonEditable = false;
    component.ngOnChanges();
    expect(component.warningCancellationReasonEditable).toEqual(false);
    component.viewType = 'maker';
    component.ngOnChanges();
    expect(component.warningCancellationReasonEditable).toEqual(false);
  });

  it('should update checker confirmation', () => {
    component.updateCheckerConfirmation();
    component.viewType = 'maker';
    component.updateCheckerConfirmation();
    expect(component.postFactoApproval.checkerConfirmation).toEqual(null);
    component.viewType = 'checker';
    component.postFactoApproval.checkerConfirmation = false;
    component.updateCheckerConfirmation();
    expect(component.postFactoApproval.checkerConfirmation).toEqual(true);
    component.updateCheckerConfirmation();
    expect(component.postFactoApproval.checkerConfirmation).toEqual(false);
  });
});
