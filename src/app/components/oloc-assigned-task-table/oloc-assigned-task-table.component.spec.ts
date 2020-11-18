import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { TableColumnFilterType } from 'src/app/models/table-column';
import { UserInfoItem } from 'src/app/models/user-info-item';
import { TaskService } from 'src/app/services/api/task.service';
import { AppService } from 'src/app/services/components/app.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockTaskColumns } from 'src/assets/data/mock-table-columns';
import { mockTasks } from 'src/assets/data/task/mock-tasks';
import { CardActionsModule } from '../card-actions/card-actions.module';
import { RectCardModule } from '../rect-card/rect-card.module';
import { TableModule } from '../table/table.module';

import { OlocAssignedTaskTableComponent } from './oloc-assigned-task-table.component';

describe('OlocAssignedTaskTableComponent', () => {
  let component: OlocAssignedTaskTableComponent;
  let fixture: ComponentFixture<OlocAssignedTaskTableComponent>;
  let appService: AppService;
  let taskService: TaskService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OlocAssignedTaskTableComponent],
      imports: [
        TestSharedModule,
        RectCardModule,
        CardActionsModule,
        TableModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlocAssignedTaskTableComponent);
    appService = TestBed.inject(AppService);
    taskService = TestBed.inject(TaskService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct table info with role', () => {
    component.columns = _.cloneDeep(mockTaskColumns);
    component.displayableData = _.cloneDeep(mockTasks);
    fixture.detectChanges();
    let userInfo: UserInfoItem = {
      role: 'RO',
    };
    appService.userInfo = userInfo;

    const column = component.columns.find(
      (item) => item.property === 'official'
    );
    expect(column.label).toEqual('RO');
    userInfo = {
      role: 'HO',
    };
    appService.userInfo = userInfo;
    expect(column.label).toEqual('HO/RO');

    column.property = 'applicationId';
    userInfo = {
      role: 'Member',
    };
    appService.userInfo = userInfo;
    expect(column.label).toEqual('HO/RO');
  });

  it('should emit event when click action', () => {
    component.columns = mockTaskColumns;
    component.displayableData = mockTasks;
    fixture.detectChanges();
    component.actionGroups[0][0].action();

    const spyOnGetTasks = spyOn(taskService, 'getTasks').and.returnValue(
      of([])
    );
    component.actionGroups[0][0].moreOptionsConfig.onApply(null, null);
    component.actionGroups[0][0].moreOptionsConfig.onApply(
      new Date(2010, 7, 5),
      new Date(2010, 7, 5)
    );
    expect(component.displayableData).toEqual([]);
    component.actionGroups[0][0].moreOptionsConfig.onApply(
      new Date(2010, 7, 6),
      new Date(2010, 7, 5)
    );
    expect(component.displayableData).toEqual([]);
    component.actionGroups[0][0].moreOptionsConfig.onApply(
      new Date(2010, 7, 6),
      new Date(2010, 7, 6)
    );
    expect(component.displayableData).toEqual([]);
    component.actionGroups[0][0].moreOptionsConfig.onApply(
      new Date(2010, 7, 6),
      new Date(2010, 7, 6)
    );
    expect(component.displayableData).toEqual([]);

    spyOnGetTasks.and.returnValue(of(mockTasks));
    component.actionGroups[0][0].moreOptionsConfig.onApply(
      new Date(2010, 7, 9),
      new Date(2010, 7, 9)
    );
    expect(component.displayableData.length).toBeTruthy();

    component.displayableData = mockTasks;
    component.actionGroups[0][0].action();

    component.selectAll = false;
    component.actionGroups[0][0].action();
    component.selectAll = true;
    component.actionGroups[0][0].action();
    expect(component.displayableData.length).toBeTruthy();

    const spyOnCreateURL = spyOn(window.URL, 'createObjectURL');
    component.selectAll = false;
    expect(component.actionGroups[1][0].disabled()).toEqual(true);
    component.actionGroups[1][0].action();
    expect(spyOnCreateURL).not.toHaveBeenCalled();
    component.selectAll = true;
    expect(component.actionGroups[1][0].disabled()).toEqual(false);
    component.actionGroups[1][0].action();
    expect(spyOnCreateURL).toHaveBeenCalled();

    const newFilters = [
      {
        value: 'test',
        property: '',
        type: 'default' as TableColumnFilterType,
      },
    ];
    component.filters = newFilters;
    expect(component.actionGroups[2][0].disabled()).toEqual(false);
    component.actionGroups[2][0].action();
    expect(component.filters.length).toEqual(0);

    component.actionGroups[2][1].action();
    expect(component.actionGroups[2][1].disabled()).toEqual(true);
    expect(component.sort).toEqual(null);

    component.actionGroups[3][0].action();
    component.actionGroups[3][0].moreOptionsConfig.onSelectHideClick();
    expect(component.layoutView).toEqual(true);
    component.actionGroups[3][0].moreOptionsConfig.onReorderClick();
    expect(component.layoutView).toEqual(true);

    expect(
      component.actionGroups[3][0].moreOptionsConfig.hiddenColumns()
    ).toBeFalsy();

    component.actionGroups[3][0].moreOptionsConfig.onShowHiddenClick();
    expect(component.filters.length).toBeFalsy();
  });

  it('should show confirm button', () => {
    component.columns = mockTaskColumns;
    component.displayableData = _.cloneDeep(mockTasks);
    (component as any)._originalData = _.cloneDeep(mockTasks);
    fixture.detectChanges();
    component.columnFilterCreator();
    expect(component.shouldShowConfirm).toBeFalsy();
  });
});
