import { TestBed } from '@angular/core/testing';
import { AppService } from 'src/app/services/components/app.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;
  let appService: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TestSharedModule] });
    appService = TestBed.inject(AppService);
    appService.userInfo = {
      role: 'RO',
      checker: false,
    };
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
