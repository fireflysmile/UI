import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { LookupService } from './lookup.service';

describe('LookupService', () => {
  let service: LookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestSharedModule],
    });
    service = TestBed.inject(LookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get members', fakeAsync(() => {
    service.getMembers().subscribe((datas) => {
      expect(datas.length).toBeTruthy();
    });
    tick(1000);
  }));

  it('should get ro employees', fakeAsync(() => {
    service.getROEmployees().subscribe((datas) => {
      expect(datas.length).toBeTruthy();
    });
    tick(1000);
  }));

  it('should get member types', fakeAsync(() => {
    service.getMemberTypes().subscribe((datas) => {
      expect(datas.length).toBeTruthy();
    });
    tick(1000);
  }));

  it('should get request types', fakeAsync(() => {
    service.getRequestTypes().subscribe((datas) => {
      expect(datas.length).toBeTruthy();
    });
    tick(1000);
  }));

  it('should get application request types', fakeAsync(() => {
    service.getApplicationRequestTypes().subscribe((datas) => {
      expect(datas.length).toBeTruthy();
    });
    tick(1000);
  }));

  it('should get available application ids', fakeAsync(() => {
    service.getAvailableApplicationIds().subscribe((datas) => {
      expect(datas.length).toBeTruthy();
    });
    tick(1000);
  }));

  it('should get available assignees', fakeAsync(() => {
    service.getAvailableAssignees().subscribe((datas) => {
      expect(datas.length).toBeTruthy();
    });
    tick(1000);
  }));

  it('should get available officials', fakeAsync(() => {
    service.getAvailableOfficials().subscribe((datas) => {
      expect(datas.length).toBeTruthy();
    });
    tick(1000);
  }));

  it('should get available pc codes', fakeAsync(() => {
    service.getAvailablePCCodes().subscribe((datas) => {
      expect(datas.length).toBeTruthy();
    });
    tick(1000);
  }));
});
