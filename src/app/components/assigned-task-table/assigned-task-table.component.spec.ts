import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import * as _ from 'lodash';
import { UserInfoItem } from 'src/app/models/user-info-item';
import { TaskService } from 'src/app/services/api/task.service';
import { AppService } from 'src/app/services/components/app.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockTaskColumns } from 'src/assets/data/mock-table-columns';
import { mockTasks } from 'src/assets/data/task/mock-tasks';
import { CardActionsModule } from '../card-actions/card-actions.module';
import { RectCardModule } from '../rect-card/rect-card.module';
import { TableLayoutEditorModule } from '../table-layout-editor/table-layout-editor.module';
import { TableModule } from '../table/table.module';

import { AssignedTaskTableComponent } from './assigned-task-table.component';

describe('AssignedTaskTableComponent', () => {
  let component: AssignedTaskTableComponent;
  let fixture: ComponentFixture<AssignedTaskTableComponent>;
  let appService: AppService;
  let taskService: TaskService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedTaskTableComponent],
      imports: [
        CardActionsModule,
        RectCardModule,
        TableModule,
        TableLayoutEditorModule,
        TestSharedModule,
      ],
      providers: [SubscriptionService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedTaskTableComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);
    taskService = TestBed.inject(TaskService);
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

    column.property = 'requestType';
    userInfo = {
      role: 'RO',
    };
    appService.userInfo = userInfo;
    expect(column.label).toEqual('HO/RO');
  });

  it('should emit event when click action', () => {
    component.columns = _.cloneDeep(mockTaskColumns);
    component.displayableData = _.cloneDeep(mockTasks);
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
    component.actionGroups[1][0].action();

    component.selectAll = false;
    component.actionGroups[1][0].action();
    component.selectAll = true;
    component.actionGroups[1][0].action();
    expect(component.displayableData.length).toEqual(mockTasks.length);

    component.actionGroups[3][0].action();
    expect(component.layoutView).toEqual(true);

    component.actionGroups[2][1].action();
    expect(component.sort).toEqual(null);
    expect(component.actionGroups[2][1].disabled()).toEqual(true);

    component.filters = [
      {
        value: 'test',
        property: 'test',
        type: 'default',
      },
    ];
    expect(component.actionGroups[2][0].disabled()).toEqual(false);
    component.actionGroups[2][0].action();
    expect(component.filters.length).toEqual(0);
  });
});
