import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { UserManagementService } from 'src/app/services/api/user-management.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockUserList } from 'src/assets/data/user-management/mock-user-list';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { ModalService } from '../modal/modal.service';
import { StaticTableModule } from '../static-table/static-table.module';

import { AccessManagementTableComponent } from './access-management-table.component';

describe('AccessManagementTableComponent', () => {
  let component: AccessManagementTableComponent;
  let fixture: ComponentFixture<AccessManagementTableComponent>;
  let modalService: ModalService;
  let userManagementService: UserManagementService;
  let spyOnModalOpen;
  let onClose;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccessManagementTableComponent],
      imports: [TestSharedModule, StaticTableModule, CheckboxModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessManagementTableComponent);
    userManagementService = TestBed.inject(UserManagementService);
    onClose = null;
    modalService = TestBed.inject(ModalService);
    spyOnModalOpen = spyOn(modalService, 'open').and.callFake(
      (_component, data) => {
        if (!onClose) {
          onClose = data.onClose;
        }
        return { close: () => {} } as any;
      }
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select all', () => {
    component.data = _.cloneDeep(mockUserList);
    component.selectAll = true;
    expect(component.selectAll).toEqual(true);
  });

  it('should open reset password modal', () => {
    const spyOnResetUserPassword = spyOn(
      userManagementService,
      'resetUserPassword'
    ).and.returnValue(of(null));
    component.openResetPasswordModal(_.cloneDeep(mockUserList[0]));
    expect(spyOnModalOpen).toHaveBeenCalled();
    onClose(false);
    expect(spyOnResetUserPassword).not.toHaveBeenCalled();
    onClose(true);
    expect(spyOnResetUserPassword).toHaveBeenCalled();
  });

  it('should open modify credentials modal', () => {
    component.openModifyCredentialsModal(_.cloneDeep(mockUserList[0]));
    expect(spyOnModalOpen).toHaveBeenCalled();
  });
});
