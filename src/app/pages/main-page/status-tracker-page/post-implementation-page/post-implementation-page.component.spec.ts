import { Component, NgModule, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { DirectorSubmitDir12Module } from 'src/app/components/director-submit-dir12/director-submit-dir12.module';
import { FileUploadCardModule } from 'src/app/components/file-upload-card/file-upload-card.module';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { ModalService } from 'src/app/components/modal/modal.service';
import { PageActionsModule } from 'src/app/components/page-actions/page-actions.module';
import { PostFactoChangedModalComponent } from 'src/app/components/post-facto-changed-modal/post-facto-changed-modal.component';
import { PostImplementationErrorModule } from 'src/app/components/post-implementation-error/post-implementation-error.module';
import { PostImplementationQuestionModule } from 'src/app/components/post-implementation-question/post-implementation-question.module';
import { RectCardModule } from 'src/app/components/rect-card/rect-card.module';
import { RequestForExtensionModule } from 'src/app/components/request-for-extension/request-for-extension.module';
import { StatusTrackerSubHeaderModule } from 'src/app/components/status-tracker-sub-header/status-tracker-sub-header.module';
import { ApplicationTrackingDetail } from 'src/app/models/application-tracking-detail';
import { PostImplementationDetail } from 'src/app/models/post-implementation-detail';
import { ApplicationService } from 'src/app/services/api/application.service';
import { StatusTrackerService } from 'src/app/services/components/status-tracker.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockPostImplementationDetail } from 'src/assets/data/application/mock-application';

import { PostImplementationPageComponent } from './post-implementation-page.component';

@Component({
  selector: 'app-test-modal',
  template: `<div>
    <app-post-implementation-page></app-post-implementation-page
    ><app-modal-outlet></app-modal-outlet>
  </div>`,
})
class TestComponent {
  @ViewChild(PostImplementationPageComponent, { static: true })
  appComponentRef: PostImplementationPageComponent;

  constructor(
    private modalService: ModalService,
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
    private statusTrackerService: StatusTrackerService
  ) {}
}

@NgModule({
  declarations: [
    TestComponent,
    PostImplementationPageComponent,
    PostFactoChangedModalComponent,
  ],
  imports: [
    StatusTrackerSubHeaderModule,
    TestSharedModule,
    RectCardModule,
    FileUploadCardModule,
    PostImplementationErrorModule,
    DirectorSubmitDir12Module,
    PostImplementationQuestionModule,
    RequestForExtensionModule,
    FileUploadCardModule,
    PageActionsModule,
    ModalModule,
  ],
  exports: [
    StatusTrackerSubHeaderModule,
    TestSharedModule,
    RectCardModule,
    FileUploadCardModule,
    PostImplementationErrorModule,
    DirectorSubmitDir12Module,
    PostImplementationQuestionModule,
    RequestForExtensionModule,
    FileUploadCardModule,
    PageActionsModule,
    TestComponent,
    PostImplementationPageComponent,
  ],
  providers: [SubscriptionService],
})
class TestModule {}

describe('PostImplementationPageComponent', () => {
  let component: PostImplementationPageComponent;
  let fixture: ComponentFixture<TestComponent>;
  let statusTrackerService: StatusTrackerService;
  let applicationService: ApplicationService;
  let modalService: ModalService;
  let onClose;
  let spyOnOpenModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    modalService = TestBed.inject(ModalService);
    statusTrackerService = TestBed.inject(StatusTrackerService);
    applicationService = TestBed.inject(ApplicationService);
    spyOnOpenModal = spyOn(modalService, 'open').and.callFake(
      (_component, data) => {
        onClose = data.onClose;
        return null;
      }
    );
    component = fixture.componentInstance.appComponentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update postImplementationDetail when destroy', () => {
    component.detail = _.cloneDeep(mockPostImplementationDetail);
    let postImplementationDetail: PostImplementationDetail;
    component.ngOnDestroy();
    statusTrackerService.postImplementationDetail$.subscribe(
      (rs) => (postImplementationDetail = rs)
    );
    expect(postImplementationDetail).toBeTruthy();
  });

  it('should check if can submit', () => {
    component.detail = _.cloneDeep(mockPostImplementationDetail);
    expect(!!component.canSubmit).toEqual(false);
    component.detail.uploaded = {
      name: 'file name',
      url: 'file url',
    };
    expect(!!component.canSubmit).toEqual(false);
    component.detail.availableDirectors[0].success = false;
    component.detail.availableDirectors[0].uploaded = {
      name: 'file name',
      url: 'file url',
    };
    expect(!!component.canSubmit).toEqual(true);
  });

  it('should get select diretor disabled', () => {
    component.detail = _.cloneDeep(mockPostImplementationDetail);
    component.detail.selectedRequestDirectors = component.detail.availableDirectors.map(
      (d) => d.name
    );
    component.detail.availableDirectors = null;
    expect(component.selectDirectorDisabled).toEqual(false);
  });

  it('should not get post implementation detail if loaded', () => {
    spyOnProperty(
      statusTrackerService,
      'postImplementationLoaded'
    ).and.returnValue(true);
    const spyOnLoadImplementation = spyOn(
      applicationService,
      'getPostImplementationDetail'
    );
    component.ngOnInit();
    expect(spyOnLoadImplementation).not.toHaveBeenCalled();

    statusTrackerService.postImplementationDetail = null;
    expect(component.detail).toEqual(null);
  });

  it('should open post facto changed modal', () => {
    spyOnProperty(
      statusTrackerService,
      'postImplementationDetail$'
    ).and.returnValue(of(_.cloneDeep(mockPostImplementationDetail)));
    spyOnOpenModal.calls.reset();
    component.detail = _.cloneDeep(mockPostImplementationDetail);
    component.ngOnInit();
    expect(spyOnOpenModal).toHaveBeenCalled();
    spyOnOpenModal.calls.reset();
    onClose(false);
    onClose(true);
  });

  it('should open post facto changed modal', () => {
    spyOnOpenModal.calls.reset();
    component.detail = _.cloneDeep(mockPostImplementationDetail);
    component.openDirectorSelectionModal();
    expect(spyOnOpenModal).toHaveBeenCalled();
    spyOnOpenModal.calls.reset();
    onClose(false);
    onClose([]);
    expect(component.detail.selectedRequestDirectors.length).toEqual(0);
  });

  it('should remove selected request director', () => {
    component.detail = _.cloneDeep(mockPostImplementationDetail);
    component.detail.selectedRequestDirectors = component.detail.availableDirectors.map(
      (d) => d.name
    );
    component.removeSelectedDirector('Rishab Kapoor');
    expect(component.detail.selectedRequestDirectors.length).toEqual(3);
  });

  it('should upload file', () => {
    component.detail = _.cloneDeep(mockPostImplementationDetail);
    const spyOnUpload = spyOn(
      applicationService,
      'uploadExtensionLetter'
    ).and.returnValue(
      of({
        name: 'newName',
        url: 'file url',
      })
    );
    component.onFileUploaded(
      new File([new Blob()], 'dummy.pdf', { type: 'pdf' })
    );
    expect(spyOnUpload).toHaveBeenCalled();
  });

  it('should submit extension request', () => {
    let postImplementationDetail: PostImplementationDetail;
    statusTrackerService.postImplementationDetail$.subscribe(
      (rs) => (postImplementationDetail = rs)
    );
    let applicationTrackingDetail: ApplicationTrackingDetail;
    statusTrackerService.applicationTrackingDetail$.subscribe(
      (rs) => (applicationTrackingDetail = rs)
    );
    spyOn(applicationService, 'submitExtensionRequest').and.returnValue(
      of({} as any)
    );
    component.submitExtensionRequest();
    expect(postImplementationDetail.submitted).toEqual(true);
    expect(applicationTrackingDetail.postImplementationSubmitted).toEqual(true);
  });

  it('should submit post implementation for dir 12', () => {
    component.detail = _.cloneDeep(mockPostImplementationDetail);
    let postImplementationDetail: PostImplementationDetail;
    statusTrackerService.postImplementationDetail$.subscribe(
      (rs) => (postImplementationDetail = rs)
    );
    let applicationTrackingDetail: ApplicationTrackingDetail;
    statusTrackerService.applicationTrackingDetail$.subscribe(
      (rs) => (applicationTrackingDetail = rs)
    );
    spyOn(applicationService, 'submitDir12s').and.returnValue(
      of({} as any)
    );
    component.submitPostImplementationForDir12();
    expect(postImplementationDetail.dir12sSubmitted).toEqual(true);
    expect(applicationTrackingDetail.postImplementationSubmitted).toEqual(true);
  });
});
