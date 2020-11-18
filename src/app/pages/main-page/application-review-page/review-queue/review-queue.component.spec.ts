import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { ApplicationReviewCardModule } from 'src/app/components/application-review-card/application-review-card.module';
import { CardActionItemModule } from 'src/app/components/card-action-item/card-action-item.module';
import { CheckboxModule } from 'src/app/components/checkbox/checkbox.module';
import { ContactBoxModule } from 'src/app/components/contact-box/contact-box.module';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { PreviewPdfModule } from 'src/app/components/preview-pdf/preview-pdf.module';
import { AttachmentItem } from 'src/app/models/attachment-item';
import { ApplicationService } from 'src/app/services/api/application.service';
import { AppService } from 'src/app/services/components/app.service';
import { ApplicationReviewCacheService } from 'src/app/services/components/application-review-cache.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockApplicationReview } from 'src/assets/data/application/mock-application-review';

import { ReviewQueueComponent } from './review-queue.component';
import { ReviewQueueModule } from './review-queue.module';

const KEY = 'application';

describe('ReviewQueueComponent', () => {
  let component: ReviewQueueComponent;
  let fixture: ComponentFixture<ReviewQueueComponent>;
  let cacheService: ApplicationReviewCacheService;
  let appService: AppService;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ContactBoxModule,
        ApplicationReviewCardModule,
        CheckboxModule,
        TestSharedModule,
        CardActionItemModule,
        ModalModule,
        ReviewQueueModule,
        PreviewPdfModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    localStorage.removeItem(KEY);
    appService = TestBed.inject(AppService);
    appService.userInfo = {
      role: 'RO',
      checker: false,
    };
    applicationService = TestBed.inject(ApplicationService);
    spyOn(applicationService, 'getApplicationById').and.returnValue(
      of(_.cloneDeep(mockApplicationReview))
    );
    cacheService = TestBed.inject(ApplicationReviewCacheService);
    cacheService.originalApplication = _.cloneDeep(mockApplicationReview);
    fixture = TestBed.createComponent(ReviewQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.save(); // empty function
    expect(component).toBeTruthy();
  });

  it('should get correct items', () => {
    component.selectedItems = [
      {
        isEdit: false,
        sentToMember: false,
        closed: false,
        section: '',
        comment: {
          text: '',
          attachment: null,
          date: '',
        },
        lastUpdatedDate: '',
        response: {
          text: '',
          attachment: null,
          date: '',
        },
      },
    ];
    expect(component.sendableItems.length).toEqual(1);

    component.onSelectAll(true);
    expect(component.selectedItems.length).toEqual(5);

    component.onToggleItem(component.application.reviewQueue[0], true);
    component.onSelectAll(false);
    component.onToggleItem(component.application.reviewQueue[0], true);
    expect(component.selectedItems.length).toEqual(1);
    component.onSelectAll(true);
    component.onToggleItem(component.application.reviewQueue[0], false);
    expect(component.selectedItems.length).toEqual(4);
  });

  it('should save when updating', () => {
    component.closeAllEdited();

    component.closeItem(component.application.reviewQueue[0]);

    component.application = _.cloneDeep(mockApplicationReview);
    component.onSelectAll(true);
    component.closeAllEdited();
    component.delete();

    component.application = _.cloneDeep(mockApplicationReview);
    component.application.reviewQueue[0].comment = null;
    component.onSelectAll(true);
    expect(component.enableDelete).toEqual(false);
    spyOnProperty(component, 'sendableItems').and.returnValue(
      component.application.reviewQueue
    );
    component.sendToMember();
  });

  it('should set view attachment', () => {
    component.application.reviewQueue[0].comment = {
      text: '',
      attachment: {
        name: 'string',
        url: 'string',
      },
    };
    component.onViewResponseAttachment(component.application.reviewQueue[0]);
    expect(component.viewAttachment.action).toEqual('download');

    component.onViewCommentAttachment(component.application.reviewQueue[0]);
    expect(component.viewAttachment.action).toEqual('download');

    component.application.reviewQueue[0].sentToMember = false;
    component.onViewCommentAttachment(component.application.reviewQueue[0]);
    expect(component.viewAttachment.action).toEqual('upload');

    const newAttachment: AttachmentItem = {
      name: '',
      url: '',
    };
    component.updateAttachment(
      newAttachment,
      new File([new Blob()], 'dummy.pdf', { type: 'pdf' })
    );
    expect(newAttachment.url).toEqual('/assets/files/dummy.pdf');
    component.updateAttachment(
      null,
      new File([new Blob()], 'dummy.pdf', { type: 'pdf' }),
      component.application.reviewQueue[0]
    );
    expect(component.application.reviewQueue[0].comment.attachment.url).toEqual(
      '/assets/files/dummy.pdf'
    );
  });

  it('should add new review', () => {
    component.followUp({
      isEdit: false,
      closed: false,
      sentToMember: true,
      section: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
      comment: {
        text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
        attachment: { name: 'Details.pdf', url: '/assets/files/sample.pdf' },
        date: '2020-05-15T21:00:34.245Z',
      },
      lastUpdatedDate: '2020-02-12T21:00:34.245Z',
      response: {
        text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
        attachment: { name: 'Response.pdf', url: '/assets/files/sample.pdf' },
        date: '2020-05-15T21:00:34.245Z',
      },
    });
    expect(component.application.reviewQueue.length).toEqual(7);
  });
});
