import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { ApplicationService } from 'src/app/services/api/application.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockApplicationReviewQueueItem } from 'src/assets/data/application/mock-application';
import { ModalModule } from '../modal/modal.module';
import { TS_MODAL_DATA, TS_MODAL_REF } from '../modal/models/ts-modal-options';
import { TsModalRef } from '../modal/models/ts-modal-ref';

import { ClarificationReviewModalComponent } from './clarification-review-modal.component';

const KEY = 'application';

describe('ClarificationReviewModalComponent', () => {
  let component: ClarificationReviewModalComponent;
  let fixture: ComponentFixture<ClarificationReviewModalComponent>;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClarificationReviewModalComponent],
      imports: [TestSharedModule, ModalModule],
      providers: [
        {
          provide: TS_MODAL_DATA,
          useValue: {
            clarifications: [_.cloneDeep(mockApplicationReviewQueueItem)],
          },
        },
        {
          provide: TS_MODAL_REF,
          useValue: TsModalRef,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    applicationService = TestBed.inject(ApplicationService);
    spyOn(applicationService, 'getCompletedClarifications').and.returnValue(
      of([_.cloneDeep(mockApplicationReviewQueueItem)])
    );
    localStorage.removeItem(KEY);
    fixture = TestBed.createComponent(ClarificationReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should export to excel', () => {
    component.exportToExcel();
    expect(component.downloadableClarifications.length).toEqual(1);
  });
});
