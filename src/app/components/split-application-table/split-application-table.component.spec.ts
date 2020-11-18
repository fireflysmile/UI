import { Component, ViewChild, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import * as _ from 'lodash';
import { TableColumnFilterType } from 'src/app/models/table-column';
import { UserInfoItem } from 'src/app/models/user-info-item';
import { TaskService } from 'src/app/services/api/task.service';
import { AppService } from 'src/app/services/components/app.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockTaskColumns } from 'src/assets/data/mock-table-columns';
import { mockTasks } from 'src/assets/data/task/mock-tasks';
import { AssignModalComponent } from '../assign-modal/assign-modal.component';
import { CardActionsModule } from '../card-actions/card-actions.module';
import { ExtendedFormModule } from '../extended-form/extended-form.module';
import { FormFieldModule } from '../form-field/form-field.module';
import { ModalModule } from '../modal/modal.module';
import { ModalService } from '../modal/modal.service';
import { RectCardModule } from '../rect-card/rect-card.module';
import { SelectModule } from '../select/select.module';
import { SplitApplicationCardModule } from '../split-application-card/split-application-card.module';
import { TableLayoutEditorModule } from '../table-layout-editor/table-layout-editor.module';
import { TableModule } from '../table/table.module';

import { SplitApplicationTableComponent } from './split-application-table.component';

@Component({
  selector: 'app-test-modal',
  template: `<div>
    <app-split-application-table></app-split-application-table
    ><app-modal-outlet></app-modal-outlet>
  </div>`,
})
class TestComponent {
  @ViewChild(SplitApplicationTableComponent, { static: true })
  appComponentRef: SplitApplicationTableComponent;

  constructor() {}
}

@NgModule({
  declarations: [AssignModalComponent],
  imports: [
    ModalModule,
    CardActionsModule,
    RectCardModule,
    TableModule,
    TableLayoutEditorModule,
    SplitApplicationCardModule,
    TestSharedModule,
    ExtendedFormModule,
    FormFieldModule,
    SelectModule,
  ],
  exports: [
    ModalModule,
    CardActionsModule,
    RectCardModule,
    TableModule,
    TableLayoutEditorModule,
    SplitApplicationCardModule,
    TestSharedModule,
    ExtendedFormModule,
  ],
})
class TestModule {}

describe('SplitApplicationTableComponent', () => {
  let component: SplitApplicationTableComponent;
  let fixture: ComponentFixture<TestComponent>;
  let appService: AppService;
  let taskService: TaskService;
  let modalService: ModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SplitApplicationTableComponent, TestComponent],
      imports: [TestModule],
      providers: [SubscriptionService],
    }).compileComponents();
  }));

  beforeEach(() => {
    appService = TestBed.inject(AppService);
    taskService = TestBed.inject(TaskService);
    modalService = TestBed.inject(ModalService);
    fixture = TestBed.createComponent(TestComponent);
    const wrapperComponent = fixture.componentInstance;
    fixture.detectChanges();
    component = wrapperComponent.appComponentRef;
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
    let onClose;
    const spyOnOpenModal = spyOn(modalService, 'open').and.callFake(
      (_component, data) => {
        onClose = data.onClose;
        return null;
      }
    );

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
    expect(component.displayableData.length).toEqual(mockTasks.length);

    component.displayableData = mockTasks;
    component.actionGroups[1][0].action();

    component.selectAll = false;
    component.actionGroups[1][0].action();
    component.selectAll = true;
    component.actionGroups[1][0].action();
    expect(component.displayableData.length).toEqual(mockTasks.length);

    component.actionGroups[1][1].action();
    expect(spyOnOpenModal).toHaveBeenCalled();
    spyOnOpenModal.calls.reset();
    onClose(false); // cancel popup
    onClose(true); // confirm popup

    component.selectAll = true;
    expect(component.assignable).toEqual(false);

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
    expect(component.sort).toEqual(null);

    component.actionGroups[3][0].action();
    expect(component.layoutView).toEqual(true);
  });
});
