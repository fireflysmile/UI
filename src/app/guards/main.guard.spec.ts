import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../services/components/app.service';
import { TestSharedModule } from '../test/test-shared.module';

import { MainGuard } from './main.guard';

describe('MainGuard', () => {
  let appService: AppService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestSharedModule],
      providers: [MainGuard],
    }).compileComponents();
    appService = TestBed.inject(AppService);
    router = TestBed.inject(Router);
  });

  it('should created', inject([MainGuard], (guard: MainGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should activate', inject([MainGuard], (guard: MainGuard) => {
    const spyOnRouter = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    let canActivate = false;
    (guard.canActivate(null, null) as Observable<boolean>).subscribe(
      (arg) => (canActivate = arg)
    );
    (appService as any)._userInfo$.next(null);
    expect(spyOnRouter).toHaveBeenCalled();

    appService.userInfo = {
      role: 'HO',
    };
    expect(canActivate).toEqual(true);
  }));
});
