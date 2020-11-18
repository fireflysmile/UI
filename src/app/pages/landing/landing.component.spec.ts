import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInfoItem } from 'src/app/models/user-info-item';
import { AppService } from 'src/app/services/components/app.service';
import { StatusTrackerService } from 'src/app/services/components/status-tracker.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let appService: AppService;
  let userInfo: UserInfoItem;
  let statusTrackerService: StatusTrackerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LandingComponent],
      imports: [TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);
    statusTrackerService = TestBed.inject(StatusTrackerService);
    appService.userInfo$.subscribe((u) => (userInfo = u));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set correct user info', () => {
    component.setUser('RO');
    expect(userInfo.role).toEqual('RO');

    component.setUser('HO');
    expect(userInfo.role).toEqual('HO');

    component.setUser('Tester');
    expect(userInfo.role).toEqual('Tester');

    component.setUser('Member');
    expect(userInfo.role).toEqual('Member');

    component.setUser('RO', true, true);
    expect(userInfo.role).toEqual('RO');
    expect(userInfo.checker).toEqual(true);
  });
});
