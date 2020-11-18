import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { RuleService } from './rule.service';

describe('RuleService', () => {
  let service: RuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestSharedModule],
    });
    service = TestBed.inject(RuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get pc code rules', fakeAsync(() => {
    service.getPcCodeRules().subscribe((rs) => {
      expect(rs).toBeTruthy();
    });
    tick(1000);
  }));

  it('should upload rule', fakeAsync(() => {
    service.uploadRule(null).subscribe((rs) => {
      expect(rs).toBeTruthy();
    });
    tick(5000);
  }));
});
