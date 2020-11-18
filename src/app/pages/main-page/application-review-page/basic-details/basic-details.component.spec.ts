import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { AlertMessageModule } from 'src/app/components/alert-message/alert-message.module';
import { ApplicationReviewCardModule } from 'src/app/components/application-review-card/application-review-card.module';
import { CardActionItemModule } from 'src/app/components/card-action-item/card-action-item.module';
import { EditFormActionsModule } from 'src/app/components/edit-form-actions/edit-form-actions.module';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { ApplicationService } from 'src/app/services/api/application.service';
import { AppService } from 'src/app/services/components/app.service';
import { ApplicationReviewCacheService } from 'src/app/services/components/application-review-cache.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockApplicationReview } from 'src/assets/data/application/mock-application-review';

import { BasicDetailsComponent } from './basic-details.component';

describe('BasicDetailsComponent', () => {
  let component: BasicDetailsComponent;
  let fixture: ComponentFixture<BasicDetailsComponent>;
  let cacheService: ApplicationReviewCacheService;
  let appService: AppService;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasicDetailsComponent],
      imports: [
        EditFormActionsModule,
        CardActionItemModule,
        ApplicationReviewCardModule,
        AlertMessageModule,
        ModalModule,
        TestSharedModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
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
    fixture = TestBed.createComponent(BasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct value when reset', () => {
    const person = {
      id: '1',
      name: '',
      requestType: '',
      educationalQualification: '',
      age: 0,
      pan: '',
      din: '',
      mobileNo: 0,
      emailId: '',
      address: '',
      proposedDateOfChange: '',
      postFacto: false,
      experiences: [],
      documents: [],
      postFactoClarification: '',
      declarations: [],
    };
    component.reset(person);
    expect(person.experiences.length).toEqual(0);
  });

  it('should save success', () => {
    component.save();

    const spyOnUpdateEdit = spyOn(component, 'updateEditInReview');
    component.application.applicants = [
      {
        id: '1',
        name: 'Abhijit Bansal',
        requestType: 'NDD to DD',
        educationalQualification: 'Post-Graduate',
        age: 42,
        pan: 'DVCPS8754A',
        din: '99878712',
        mobileNo: 9475802915,
        emailId: 'abhijit.b@gmail.com',
        address: null,
        proposedDateOfChange: '2020-06-10T21:00:34.245Z',
        postFacto: false,
        declarations: [],
        experiences: [
          {
            id: '1',
            from: '2017-01-01T00:00:00.000Z',
            to: '2020-07-01T00:00:00.000Z',
            company: 'C1 Company',
            designation: 'Director',
            profile: 'Head of Operations',
          },
        ],
        documents: [
          {
            type: 'Experience Letter',
            company: 'A1 Company',
            name: 'Abhijit Bansal_A1 Company_Experience Letter',
            url: '/assets/files/sample.pdf',
          },
          {
            type: 'Board Resolution',
            name: 'Abhijit Bansal_Board Resolution',
            url: '/assets/files/sample.pdf',
          },
        ],
        postFactoClarification:
          'Did not know we had to apply for prior approval',
      },
    ];
    component.save();
    expect(spyOnUpdateEdit).toHaveBeenCalled();
    spyOnUpdateEdit.calls.reset();

    spyOn(component, 'canSave').and.returnValue(false);
    component.save();
    expect(spyOnUpdateEdit).not.toHaveBeenCalled();
  });
});
