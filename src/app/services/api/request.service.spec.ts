import { TestBed } from '@angular/core/testing';

import { RequestService } from './request.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { environment } from 'src/environments/environment';

const { apiHost } = environment;

describe('RequestService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [TestSharedModule],
    })
  );

  it('should be created', () => {
    const service: RequestService = TestBed.inject(RequestService);
    expect(service).toBeTruthy();
  });

  it('should get http params', () => {
    const service: RequestService = TestBed.inject(RequestService);
    expect(
      (service as any).getHttpParams({ test: 'test1', test2: undefined })
    ).toEqual({
      test: 'test1',
    }); // use any to check protected method

    expect((service as any).getHttpParams(null)).toEqual({}); // use any to check protected method
  });

  it('should get correct endpoint', () => {
    const service: RequestService = TestBed.inject(RequestService);
    expect((service as any).endpoint('')).toEqual(apiHost + '/request'); // use any to check protected method
    expect((service as any).endpoint()).toEqual(apiHost + '/request'); // use any to check protected method
  });

  it('should get fake response', () => {
    const service: RequestService = TestBed.inject(RequestService);
    expect((service as any).getFakeResponse('', true)).toBeTruthy(); // use any to check protected method
    expect((service as any).getFakeResponse('')).toBeTruthy(); // use any to check protected method
    expect((service as any).getFakeResponse('', false)).toBeTruthy(); // use any to check protected method
  });

  it('should attach delay', () => {
    const service: RequestService = TestBed.inject(RequestService);
    expect((service as any).attachDelay()).toBeTruthy(); // use any to check protected method
  });
});
