import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { UserInfoItem } from 'src/app/models/user-info-item';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockApplicationReview } from 'src/assets/data/application/mock-application-review';
import { environment } from 'src/environments/environment';
import { AppService } from '../components/app.service';
import { ApplicationService } from './application.service';

import { NotificationService } from './notification.service';

const { apiHost } = environment;

describe('NotificationService', () => {
  let httpClient: HttpClient;
  let appService: AppService;
  let service: NotificationService;
  let applicationService: ApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestSharedModule],
    });
    applicationService = TestBed.inject(ApplicationService);
    spyOn(applicationService, 'getApplicationById').and.returnValue(
      of(_.cloneDeep(mockApplicationReview))
    );
    httpClient = TestBed.inject(HttpClient);
    appService = TestBed.inject(AppService);
    appService.userInfo = {
      role: 'RO',
      checker: false,
    };
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    service.ngOnDestroy();
  });

  it('should get notification', () => {
    const spyOnGet = spyOn(httpClient, 'get');

    let userInfo: UserInfoItem = {
      role: 'Member',
    };
    appService.userInfo = userInfo;
    service.getNotifications();
    expect(spyOnGet).toHaveBeenCalledWith(
      apiHost + '/notification/notifications.json'
    );
    spyOnGet.calls.reset();

    userInfo = {
      role: 'RO',
    };
    appService.userInfo = userInfo;
    service.getNotifications();
    expect(spyOnGet).toHaveBeenCalledWith(
      apiHost + '/notification/ro-notifications.json'
    );
    spyOnGet.calls.reset();

    userInfo = {
      role: 'HO',
    };
    appService.userInfo = userInfo;
    service.getNotifications();
    expect(spyOnGet).not.toHaveBeenCalled();
    spyOnGet.calls.reset();
  });

  it('should get recent notification', () => {
    const spyOnGet = spyOn(httpClient, 'get');

    let userInfo: UserInfoItem = {
      role: 'Member',
    };
    appService.userInfo = userInfo;
    service.getRecentNotifications();
    expect(spyOnGet).toHaveBeenCalledWith(
      apiHost + '/notification/recent-notifications.json'
    );
    spyOnGet.calls.reset();

    userInfo = {
      role: 'RO',
    };
    appService.userInfo = userInfo;
    service.getRecentNotifications();
    expect(spyOnGet).toHaveBeenCalledWith(
      apiHost + '/notification/recent-ro-notifications.json'
    );
    spyOnGet.calls.reset();

    userInfo = {
      role: 'HO',
    };
    appService.userInfo = userInfo;
    service.getRecentNotifications();
    expect(spyOnGet).not.toHaveBeenCalled();
    spyOnGet.calls.reset();
  });
});
