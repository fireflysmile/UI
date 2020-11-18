import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppService } from 'src/app/services/components/app.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { AutoCloserModule } from '../auto-closer/auto-closer.module';
import { NotificationItemModule } from '../notification-item/notification-item.module';

import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let appService: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      imports: [TestSharedModule, NotificationItemModule, AutoCloserModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    appService = TestBed.inject(AppService);
    appService.userInfo = {
      role: 'RO',
      checker: false,
    };
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
