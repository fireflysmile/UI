import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInfoItem } from 'src/app/models/user-info-item';
import { AppService } from 'src/app/services/components/app.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { ExtendedFormModule } from '../extended-form/extended-form.module';
import { FormFieldModule } from '../form-field/form-field.module';
import { SelectModule } from '../select/select.module';

import { AccessManagementFilterComponent } from './access-management-filter.component';

describe('AccessManagementFilterComponent', () => {
  let component: AccessManagementFilterComponent;
  let fixture: ComponentFixture<AccessManagementFilterComponent>;
  let appService: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccessManagementFilterComponent],
      imports: [
        TestSharedModule,
        ExtendedFormModule,
        SelectModule,
        FormFieldModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessManagementFilterComponent);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);
    const userInfo: UserInfoItem = {
      role: 'RO',
    };
    appService.userInfo = userInfo;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set valid', () => {
    component.group.patchValue({
      userId: 'string',
      memberId: 'string',
      segment: '',
    });
    expect(component.valid).toEqual(true);
    const userInfo: UserInfoItem = {
      role: 'LCN Admin',
    };
    appService.userInfo = userInfo;
    component.group.patchValue({
      userId: '',
      memberId: 'string',
      segment: '',
    });
    expect(component.valid).toEqual(true);

    component.resetFilter();
    expect(component.valid).toEqual(false);
  });
});
