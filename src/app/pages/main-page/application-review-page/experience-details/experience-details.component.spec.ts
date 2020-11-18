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

import { ExperienceDetailsComponent } from './experience-details.component';

describe('ExperienceDetailsComponent', () => {
  let component: ExperienceDetailsComponent;
  let fixture: ComponentFixture<ExperienceDetailsComponent>;
  let cacheService: ApplicationReviewCacheService;
  let appService: AppService;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExperienceDetailsComponent],
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
    fixture = TestBed.createComponent(ExperienceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set data when update', () => {
    component.update.next();
    expect(component.tableData.length).toEqual(2);
  });

  it('should get correct total experience', () => {
    expect(
      component.columns[2].valueAccessor({
        from: null,
        to: null,
        id: '',
        company: '',
        designation: '',
        profile: '',
      })
    ).toEqual(null);
  });

  it('should reset person', () => {
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
    const experience = {
      id: '1',
      from: '',
      to: '',
      company: '',
      designation: '',
      profile: '',
    };
    component.reset(person, experience);
    expect(experience.company).toEqual('A1 Company');
  });

  it('should save success', () => {
    expect(component.canSave()).toEqual(true);

    const spyOnUpdateEdit = spyOn(
      component,
      'removeAnyEditsFromReview'
    ).and.returnValue(of({} as any));
    spyOn(applicationService, 'updateExperienceDetails').and.returnValue(
      of({} as any) // fake empty response
    );
    const spyOnCanSave = spyOn(component, 'canSave').and.returnValue(false);
    component.save();
    expect(spyOnUpdateEdit).not.toHaveBeenCalled();
    spyOnCanSave.and.returnValue(true);

    component.tableData.push({
      id: '1',
      name: 'Rishab Kapoor',
      experiences: [
        {
          id: '1',
          from: '2018-01-01T00:00:00.000Z',
          to: '2019-07-01T00:00:00.000Z',
          company: 'A1 Companytest',
          designation: 'Directortest',
          profile: 'Head of Operationstest',
        },
        {
          id: '2',
          from: '2020-01-01T00:00:00.000Z',
          to: '2021-01-01T00:00:00.000Z',
          company: 'B1 Companytest',
          designation: 'Directortest',
          profile: 'Head of Operationstest',
        },
      ],
    });
    component.save();
    expect(spyOnUpdateEdit).toHaveBeenCalled();
  });
});
