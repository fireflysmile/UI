import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import * as _ from 'lodash';
import { ApplicationReviewCacheService } from 'src/app/services/components/application-review-cache.service';
import { FileService } from 'src/app/services/helpers/file.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockApplicationReview } from 'src/assets/data/application/mock-application-review';

import { ApplicationReviewSectionBaseComponent } from './application-review-section-base.component';
import { AppService } from 'src/app/services/components/app.service';
import { ApplicationService } from 'src/app/services/api/application.service';

describe('ApplicationReviewSectionBaseComponent', () => {
  let component: ApplicationReviewSectionBaseComponent;
  let fixture: ComponentFixture<ApplicationReviewSectionBaseComponent>;
  let cacheService: ApplicationReviewCacheService;
  let fileService: FileService;
  let appService: AppService;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationReviewSectionBaseComponent],
      imports: [TestSharedModule],
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
    fileService = TestBed.inject(FileService);
    cacheService.originalApplication = _.cloneDeep(mockApplicationReview);
    fixture = TestBed.createComponent(ApplicationReviewSectionBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set view type base on user info', () => {
    expect(component.viewType).toEqual('maker');
    appService.userInfo = {
      role: 'RO',
      checker: true,
    };
    expect(component.viewType).toEqual('checker');
  });

  it('should not save if desploy with invalid', () => {
    const spyOnSave = spyOn(component, 'save').and.callThrough();
    spyOn(component as any, '_validateInputs').and.returnValue(false);
    component.ngOnDestroy();
    expect(spyOnSave).not.toHaveBeenCalled();
  });

  it('should get correct action', () => {
    expect(component.action).toEqual('add');
    component.edit();
    expect(component.action).toEqual('reset');
  });

  it('should update when cancel', () => {
    const spyOnUpdate = spyOn(component.update, 'emit').and.callThrough();
    component.cancel();
    expect(spyOnUpdate).toHaveBeenCalled();
  });

  it('should save success', () => {
    component.save(); // this method do nothing
    expect(component).toBeTruthy();
  });

  it('should download success', () => {
    const spyOnDownload = spyOn(fileService, 'downloadFile');
    component.download();
    expect(spyOnDownload).toHaveBeenCalled();
  });

  it('should get correct review info', () => {
    expect(component.getPerson('1', mockApplicationReview).postFacto).toEqual(
      false
    );
    expect(component.getPerson('2', mockApplicationReview).postFacto).toEqual(
      true
    );
    expect(component.personNameAndRequestType('1')).toEqual(
      'Rishab Kapoor | Incoming DD '
    );
    expect(component.personNameAndRequestType('2')).toEqual(
      'Abhijit Bansal | NDD to DD (Post-Facto)'
    );

    component.addToReview('sectionName', '1');
    expect(component.application.reviewQueue.length).toEqual(7);
    // don't add more if dupldated
    component.addToReview('sectionName', '1');
    expect(component.application.reviewQueue.length).toEqual(7);

    component.addToReview('sectionName', '2', 'test', false);
    expect(component.application.reviewQueue.length).toEqual(9);

    component.addToReview('sectionName', null, 'test', false);
    expect(component.application.reviewQueue.length).toEqual(11);

    component.removeAnyEditsFromReview('sectionName', null, 'test');
    expect(component.application.reviewQueue.length).toEqual(11);

    component.addToReview('sectionName', '1', '', true);
    expect(component.application.reviewQueue.length).toEqual(13);
    component.removeAnyEditsFromReview('sectionName', '1');
    expect(component.application.reviewQueue.length).toEqual(13);

    component.updateEditInReview('sectionName', '1', null, '');
    expect(component.application.reviewQueue.length).toEqual(13);

    component.updateEditInReview('sectionName', '1', null, '');
    expect(component.application.reviewQueue.length).toEqual(13);

    component.updateEditInReview('Rishab Kapoor', '1', null, '');
    component.application.reviewQueue[4].isEdit = true;
    component.application.reviewQueue[4].sentToMember = false;
    component.application.reviewQueue[4].section =
      'Rishab\nRishab Kapoor | Incoming DD test test';
    component.updateEditInReview('Rishab', '1', null, '');
    expect(component.application.reviewQueue.length).toEqual(15);
  });

  it('should unsubscribe when destroy', () => {
    const unSubscribe = of('test').subscribe();
    const spyOnUnSubscribe = spyOn(unSubscribe, 'unsubscribe');
    component.subscriptions = [unSubscribe];
    component.ngOnDestroy();
    expect(spyOnUnSubscribe).toHaveBeenCalled();

    const spyOnSave = spyOn(component, 'save');
    spyOn(component.elemRef.nativeElement, 'querySelectorAll').and.returnValue([
      'error1',
    ]);
    component.isEditing = true;
    component.ngOnDestroy();
    expect(spyOnSave).not.toHaveBeenCalled();
  });

  it('should check can save', () => {
    expect(component.canSave()).toEqual(true);

    spyOn(component.elemRef.nativeElement, 'querySelectorAll').and.returnValue([
      'error1',
    ]);
    expect(component.canSave()).toEqual(false);
  });
});
