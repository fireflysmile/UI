import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { NotificationItemComponent } from './notification-item.component';

describe('NotificationItemComponent', () => {
  let component: NotificationItemComponent;
  let fixture: ComponentFixture<NotificationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationItemComponent],
      imports: [TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set/get correct notification', () => {
    component.notification = null;
    expect(component.notification).toEqual(null);

    component.notification = {
      type: 'error',
      title: 'title',
      content: 'content',
    };
    expect(component.isError).toEqual(true);

    component.notification = {
      type: 'approval-responded',
      title: 'title',
      content: 'content',
    };
    expect(component.isDefault).toEqual(true);
  });
});
