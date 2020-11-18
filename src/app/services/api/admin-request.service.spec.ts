import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockHTTPTestSharedModule } from 'src/app/test/test-shared.module';
import { mockAdminRequests } from 'src/assets/data/adminRequest/mock-admin-requests';
import { environment } from 'src/environments/environment';

import { AdminRequestService } from './admin-request.service';

const { apiHost } = environment;

describe('AdminRequestService', () => {
  let service: AdminRequestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockHTTPTestSharedModule],
    });

    service = TestBed.inject(AdminRequestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get admin requests', () => {
    service
      .getAdminRequests(new Date(2010, 7, 5), new Date(2010, 7, 5))
      .subscribe((rs) => {
        expect(rs.length).toEqual(0);
      });
    let req = httpMock.expectOne(apiHost + '/adminRequest/admin-requests.json');
    req.flush(mockAdminRequests);

    service.getAdminRequests(null, null).subscribe((rs) => {
      expect(rs.length).toEqual(100);
    });
    req = httpMock.expectOne(apiHost + '/adminRequest/admin-requests.json');
    req.flush(mockAdminRequests);
  });
});
