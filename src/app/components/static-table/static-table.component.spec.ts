import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { UserAccessInfoItem } from 'src/app/models/user-access-info-item';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockUserList } from 'src/assets/data/user-management/mock-user-list';
import { AccessManagementTableComponent } from '../access-management-table/access-management-table.component';
import { CheckboxModule } from '../checkbox/checkbox.module';

import { StaticTableComponent } from './static-table.component';
import { StaticTableModule } from './static-table.module';

describe('StaticTableComponent', () => {
  let component: StaticTableComponent<UserAccessInfoItem>;
  let fixture: ComponentFixture<AccessManagementTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccessManagementTableComponent],
      imports: [TestSharedModule, StaticTableModule, CheckboxModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessManagementTableComponent);
    const accessManageTable = fixture.componentInstance;
    fixture.detectChanges();
    component = accessManageTable.refToStaticTable;
    component.fixedHeader = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove all event when destroy', () => {
    const windowRemoveEvent = spyOn(window, 'removeEventListener');
    component.ngOnDestroy();
    expect(windowRemoveEvent).toHaveBeenCalled();
  });

  it('should set event for ie', () => {
    const spyOnWindowIe = spyOnProperty(
      window.navigator,
      'userAgent'
    ).and.returnValue('testMSIE ');
    component.fixedHeader = false;
    fixture.detectChanges();
    component.ngAfterContentInit();
    component.headerColumnList.notifyOnChanges();
    component.bodyColumnList.notifyOnChanges();
    expect(spyOnWindowIe).toHaveBeenCalled();
    spyOnWindowIe.calls.reset();

    component.fixedHeader = true;
    fixture.detectChanges();
    expect(spyOnWindowIe).toHaveBeenCalled();
    spyOnWindowIe.calls.reset();

    component.headerColumnList.notifyOnChanges();
    component.bodyColumnList.notifyOnChanges();
    expect(spyOnWindowIe).toHaveBeenCalled();
    spyOnWindowIe.calls.reset();

    (component as any)._previousHeaderTop = -100;

    component.headerColumnList.notifyOnChanges();
    component.bodyColumnList.notifyOnChanges();
    expect(spyOnWindowIe).toHaveBeenCalled();
    spyOnWindowIe.calls.reset();
    expect((component as any)._previousHeaderTop).toEqual(0);
  });

  it('should sort component', () => {
    component.sort = null;
    component.sort = {
      test: 'asc',
    };
    expect(component.headerColumnList.first.direction).toBeFalsy();

    const spyOnSortChange = spyOn(component.sortChanged, 'emit');
    component.headerColumnList.forEach((header) => {
      header.useSort = true;
    });
    component.changeSortDirection(component.headerColumnList.first);
    expect(spyOnSortChange).toHaveBeenCalled();
    spyOnSortChange.calls.reset();

    component.useMultiSort = true;
    component.changeSortDirection(component.headerColumnList.first);
    expect(spyOnSortChange).toHaveBeenCalled();
    spyOnSortChange.calls.reset();
  });

  it('should set data', () => {
    component.data = _.cloneDeep(mockUserList);
    expect(component.rows.length).toEqual(mockUserList.length);
  });
});
