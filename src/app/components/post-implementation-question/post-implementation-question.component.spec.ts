import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { ApplicationService } from 'src/app/services/api/application.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockPostImplementationDetail } from 'src/assets/data/application/mock-application';
import { MessageService } from '../message/message.service';
import { ModalService } from '../modal/modal.service';

import { PostImplementationQuestionComponent } from './post-implementation-question.component';

describe('PostImplementationQuestionComponent', () => {
  let component: PostImplementationQuestionComponent;
  let fixture: ComponentFixture<PostImplementationQuestionComponent>;
  let modalService: ModalService;
  let messageService: MessageService;
  let onClose;
  let spyOnOpenModal;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostImplementationQuestionComponent],
      imports: [TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostImplementationQuestionComponent);

    modalService = TestBed.inject(ModalService);
    applicationService = TestBed.inject(ApplicationService);
    messageService = TestBed.inject(MessageService);
    spyOnOpenModal = spyOn(modalService, 'open').and.callFake(
      (_component, data) => {
        onClose = data.onClose;
        return null;
      }
    );

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show message when click no', () => {
    const spyOnOpen = spyOn(messageService, 'open');
    component.onClickNo();
    expect(spyOnOpen).toHaveBeenCalled();
  });

  it('should open director selection modal', () => {
    spyOn(
      applicationService,
      'confirmMemberPostImplementation'
    ).and.returnValue(of({} as any));
    spyOnOpenModal.calls.reset();
    component.detail = _.cloneDeep(mockPostImplementationDetail);
    component.openDirectorSelectionModal();
    expect(spyOnOpenModal).toHaveBeenCalled();
    spyOnOpenModal.calls.reset();
    onClose(false);
    onClose([]);
    expect(component.detail.selectedRequestDirectors.length).toEqual(0);
  });
});
