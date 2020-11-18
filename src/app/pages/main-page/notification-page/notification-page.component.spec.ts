import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BackButtonModule } from 'src/app/components/back-button/back-button.module';
import { NotificationItemModule } from 'src/app/components/notification-item/notification-item.module';
import { PageTitleModule } from 'src/app/components/page-title/page-title.module';
import { NotificationService } from 'src/app/services/api/notification.service';
import { AppService } from 'src/app/services/components/app.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { NotificationPageComponent } from './notification-page.component';

describe('NotificationPageComponent', () => {
  let component: NotificationPageComponent;
  let fixture: ComponentFixture<NotificationPageComponent>;
  let appService: AppService;
  let subscriptionService: SubscriptionService;
  let notificationService: NotificationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationPageComponent],
      imports: [
        BackButtonModule,
        PageTitleModule,
        NotificationItemModule,
        TestSharedModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    appService = TestBed.inject(AppService);
    notificationService = TestBed.inject(NotificationService);
    subscriptionService = TestBed.inject(SubscriptionService);
    spyOn(subscriptionService, 'store');
    appService.userInfo = {
      role: 'RO',
      checker: false,
    };
    fixture = TestBed.createComponent(NotificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get notifications', () => {
    const spyOnGetNotification = spyOn(
      notificationService,
      'getNotifications'
    ).and.returnValue(of([]));
    component.ngOnInit();
    expect(spyOnGetNotification).toHaveBeenCalled();
  });
});
