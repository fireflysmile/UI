import { TestBed } from '@angular/core/testing';
import { UserInfoItem } from 'src/app/models/user-info-item';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestSharedModule],
    });

    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set userInfo with correct role', () => {
    let expectedUserInfo: UserInfoItem;
    let isOfficial: boolean;
    let isHO: boolean;
    let isMemberAdmin: boolean;
    let isLCNAdmin: boolean;
    let isDisabled: boolean;
    let isEnabled: boolean;
    let isOloc: boolean;
    service.userInfo$.subscribe((rs) => (expectedUserInfo = rs));
    service.isHO$.subscribe((rs) => (isHO = rs));
    service.isOfficial$.subscribe((rs) => (isOfficial = rs));
    service.isMemberAdmin$.subscribe((rs) => (isMemberAdmin = rs));
    service.isLCNAdmin$.subscribe((rs) => (isLCNAdmin = rs));
    service.isDisabled$.subscribe((rs) => (isDisabled = rs));
    service.isEnabled$.subscribe((rs) => (isEnabled = rs));
    service.isOloc$.subscribe((rs) => (isOloc = rs));

    let userInfo: UserInfoItem = {
      role: 'HO',
    };
    service.userInfo = userInfo;
    expect(isHO).toEqual(true);
    expect(isOfficial).toEqual(true);

    userInfo = {
      role: 'RO',
    };
    service.userInfo = userInfo;
    expect(isHO).toEqual(false);
    expect(isOfficial).toEqual(true);

    userInfo = {
      role: 'Member Admin',
    };
    service.userInfo = userInfo;
    expect(isMemberAdmin).toEqual(true);

    userInfo = {
      role: 'LCN Admin',
    };
    service.userInfo = userInfo;
    expect(isLCNAdmin).toEqual(true);

    userInfo = {
      role: 'LCN Super Admin',
    };
    service.userInfo = userInfo;
    expect(isLCNAdmin).toEqual(true);

    userInfo = {
      role: 'LCN Super Admin',
      enabled: false,
    };
    service.userInfo = userInfo;
    expect(isDisabled).toEqual(true);

    userInfo = {
      role: 'LCN Super Admin',
      enabled: true,
    };
    service.userInfo = userInfo;
    expect(isEnabled).toEqual(true);

    userInfo = {
      role: 'Oloc',
    };
    service.userInfo = userInfo;
    expect(isOloc).toEqual(true);
  });
});
