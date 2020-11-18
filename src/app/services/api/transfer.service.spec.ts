import { TestBed } from '@angular/core/testing';

import { TransferService } from './transfer.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';

describe('TransferService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [TestSharedModule],
    })
  );

  it('should be created', () => {
    const service: TransferService = TestBed.inject(TransferService);
    expect(service).toBeTruthy();
  });
});
