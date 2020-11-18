import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { RectCardModule } from '../rect-card/rect-card.module';
import { TabRouterModule } from '../tab-router/tab-router.module';

import { UserManagementTabRouterComponent } from './user-management-tab-router.component';

describe('UserManagementTabRouterComponent', () => {
  let component: UserManagementTabRouterComponent;
  let fixture: ComponentFixture<UserManagementTabRouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserManagementTabRouterComponent],
      imports: [TestSharedModule, RectCardModule, TabRouterModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementTabRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
