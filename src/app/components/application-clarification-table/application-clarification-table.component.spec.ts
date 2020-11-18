import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockApplicationReviewQueueItem } from 'src/assets/data/application/mock-application';
import { CardActionItemModule } from '../card-action-item/card-action-item.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { ModalModule } from '../modal/modal.module';
import { PreviewPdfModule } from '../preview-pdf/preview-pdf.module';

import { ApplicationClarificationTableComponent } from './application-clarification-table.component';

describe('ApplicationClarificationTableComponent', () => {
  let component: ApplicationClarificationTableComponent;
  let fixture: ComponentFixture<ApplicationClarificationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationClarificationTableComponent],
      imports: [
        CheckboxModule,
        TestSharedModule,
        CardActionItemModule,
        PreviewPdfModule,
        ModalModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationClarificationTableComponent);
    component = fixture.componentInstance;
    component.data = [mockApplicationReviewQueueItem];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select all', () => {
    _.forEach(component.data, (d) => (d.sentToMaker = false));
    component.selectAll = true;
    expect(component.selectAll).toEqual(true);
  });

  it('should open attachemnt item', () => {
    component.openAttachmentViewer(
      {
        name: 'name',
        url: '',
      },
      'upload'
    );
    expect(component.showAttachmentViewer).toEqual(true);
    fixture.detectChanges();
  });

  it('should upload response attachemnt', () => {
    component.uploadResponseAttachment(
      component.data[0],
      new File([new Blob()], 'dummy.pdf', { type: 'pdf' })
    );
    expect(component.data[0].comment.attachment.name).toBeTruthy();
  });

  it('should update response attachemnt', () => {
    component.uploadResponseAttachment(
      component.data[0],
      new File([new Blob()], 'dummy.pdf', { type: 'pdf' })
    );
    component.openAttachmentViewer(
      component.data[0].comment.attachment,
      'upload'
    );
    component.updateResponseAttachment(
      new File([new Blob()], 'dummy.pdf', { type: 'pdf' })
    );
    expect(component.viewerData.attachment.name).toBeTruthy();
  });
});
