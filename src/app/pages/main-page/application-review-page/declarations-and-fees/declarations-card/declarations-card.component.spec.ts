import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { AlertMessageModule } from 'src/app/components/alert-message/alert-message.module';
import { ApplicationReviewCardModule } from 'src/app/components/application-review-card/application-review-card.module';
import { EditFormActionsModule } from 'src/app/components/edit-form-actions/edit-form-actions.module';
import { FormFieldModule } from 'src/app/components/form-field/form-field.module';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { ApplicationService } from 'src/app/services/api/application.service';
import { AppService } from 'src/app/services/components/app.service';
import { ApplicationReviewCacheService } from 'src/app/services/components/application-review-cache.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockApplicationReview } from 'src/assets/data/application/mock-application-review';

import { DeclarationsCardComponent } from './declarations-card.component';

describe('DeclarationsCardComponent', () => {
  let component: DeclarationsCardComponent;
  let fixture: ComponentFixture<DeclarationsCardComponent>;
  let cacheService: ApplicationReviewCacheService;
  let applicationService: ApplicationService;
  let appService: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeclarationsCardComponent],
      imports: [
        ApplicationReviewCardModule,
        EditFormActionsModule,
        AlertMessageModule,
        ModalModule,
        TestSharedModule,
        FormFieldModule,
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
    fixture = TestBed.createComponent(DeclarationsCardComponent);
    component = fixture.componentInstance;
    component.personId = '1';
    component.ngOnInit();
    component.update.emit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset declaration', () => {
    const declaration = {
      questionId: '1',
      response: 'Yes' as 'Yes' | 'No',
      clarification: '',
    };
    component.reset(declaration);
    expect(declaration.response).toEqual('No');

    component.personId = '2';
    component.ngOnInit();
    expect(component.name).toEqual('Abhijit Bansal | NDD to DD (Post-Facto)');

    component.personId = null;
    component.ngOnInit();
    component.reset(declaration);
    // don't change component nam eif personId === null
    expect(component.name).toEqual('Abhijit Bansal | NDD to DD (Post-Facto)');
  });

  it('should save success', () => {
    spyOn(applicationService, 'updateDeclarations').and.returnValue(
      of({} as any)
    );
    component.personId = '1';
    component.save();
    expect(component.application.reviewQueue.length).toEqual(5);
    component.personId = null;
    component.save();
    expect(component.application.reviewQueue.length).toEqual(5);

    component.personId = '1';
    component.getPerson(
      component.personId,
      component.originalApplication
    ).person.declarations[0].response = 'Yes';
    component.save();
    expect(component.application.reviewQueue.length).toEqual(7);

    const spyOnRemoveAnyEdit = spyOn(component, 'removeAnyEditsFromReview');
    expect(component.canSave()).toEqual(true);
    spyOn(component, 'canSave').and.returnValue(false);
    component.save();
    expect(spyOnRemoveAnyEdit).not.toHaveBeenCalled();
  });
});
