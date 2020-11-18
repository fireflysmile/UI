import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { AccessManagementFilterModule } from 'src/app/components/access-management-filter/access-management-filter.module';
import { AccessManagementTableModule } from 'src/app/components/access-management-table/access-management-table.module';
import { UserManagementService } from 'src/app/services/api/user-management.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockUserList } from 'src/assets/data/user-management/mock-user-list';

import { AccessManagementPageComponent } from './access-management-page.component';

describe('AccessManagementPageComponent', () => {
  let component: AccessManagementPageComponent;
  let fixture: ComponentFixture<AccessManagementPageComponent>;
  let userManagementService: UserManagementService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccessManagementPageComponent],
      imports: [
        TestSharedModule,
        AccessManagementFilterModule,
        AccessManagementTableModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessManagementPageComponent);
    userManagementService = TestBed.inject(UserManagementService);
    const userList = _.cloneDeep(mockUserList);
    userList[0].selected = true;
    spyOn(userManagementService, 'getUserAccessInfo').and.returnValue(
      of(userList)
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check has selected', () => {
    component.getUserAccessInfo({
      userId: 'string',
      memberId: 'string',
      segment: 'string',
    });
    expect(component.hasSelected).toEqual(true);
  });

  it('should enable selected user', () => {
    component.setEnabledStateForSelectedUsers(true);
    expect(component.data[0].enabled).toEqual(true);
  });
});
