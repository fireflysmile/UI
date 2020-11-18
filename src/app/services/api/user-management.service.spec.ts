import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockUserList } from 'src/assets/data/user-management/mock-user-list';

import { UserManagementService } from './user-management.service';
import { of } from 'rxjs';

describe('UserManagementService', () => {
  let service: UserManagementService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TestSharedModule] });
    service = TestBed.inject(UserManagementService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get access info', () => {
    spyOn(http, 'get').and.returnValue(of(_.cloneDeep(mockUserList)));
    service
      .getUserAccessInfo(null)
      .subscribe((rs) => expect(rs.length).toEqual(10));
    service
      .getUserAccessInfo({
        userId: 'User ID 1',
        memberId: 'Member ID 1',
        segment: 'newSegment',
      })
      .subscribe((rs) => expect(rs.length).toEqual(0));
  });

  it('should reset user password', fakeAsync(() => {
    service.resetUserPassword().subscribe((rs) => expect(rs).toEqual(null));
    tick(1000);
  }));

  it('should update user credentials', fakeAsync(() => {
    service
      .updateUserCredentials(null, null)
      .subscribe((rs) => expect(rs).toEqual(null));
    tick(1000);
  }));
});
