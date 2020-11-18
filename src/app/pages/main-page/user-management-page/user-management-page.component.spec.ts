import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserManagementTabRouterModule } from 'src/app/components/user-management-tab-router/user-management-tab-router.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { UserManagementPageComponent } from './user-management-page.component';

describe('UserManagementPageComponent', () => {
  let component: UserManagementPageComponent;
  let fixture: ComponentFixture<UserManagementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserManagementPageComponent],
      imports: [TestSharedModule, UserManagementTabRouterModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
