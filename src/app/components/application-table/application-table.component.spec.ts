import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { UserInfoItem } from 'src/app/models/user-info-item';
import { AppService } from 'src/app/services/components/app.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockApplication } from 'src/assets/data/application/mock-application';
import { mockApplicationColumns } from 'src/assets/data/mock-table-columns';
import { CardActionsModule } from '../card-actions/card-actions.module';
import { RectCardModule } from '../rect-card/rect-card.module';
import { TableLayoutEditorModule } from '../table-layout-editor/table-layout-editor.module';
import { TableModule } from '../table/table.module';

import { ApplicationTableComponent } from './application-table.component';

describe('ApplicationTableComponent', () => {
  let component: ApplicationTableComponent;
  let fixture: ComponentFixture<ApplicationTableComponent>;
  let appService: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationTableComponent],
      imports: [
        CardActionsModule,
        RectCardModule,
        TableModule,
        TableLayoutEditorModule,
        TestSharedModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationTableComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct table info with role', () => {
    component.columns = _.cloneDeep(mockApplicationColumns);
    component.data = _.cloneDeep(mockApplication);
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
    component.columns = mockApplicationColumns;
    component.data = mockApplication;
    fixture.detectChanges();
    component.selectAll = true;
    const spyOnHasSelected = spyOnProperty(
      component,
      'hasSelected'
    ).and.returnValue(false);
    component.loaded = true;
    component.actionGroups[0][0].action();
    expect(component.actionGroups[0][0].disabled()).toEqual(true);

    spyOnHasSelected.and.returnValue(true);
    component.actionGroups[0][0].action();
    expect(component.actionGroups[0][0].disabled()).toEqual(false);

    component.actionGroups[1][0].action();
    expect(component.actionGroups[1][0].disabled()).toEqual(true);

    component.filters = [
      {
        value: 'test',
        property: 'test',
        type: 'default',
      },
    ];
    expect(component.actionGroups[1][0].disabled()).toEqual(false);

    component.actionGroups[2][0].action();
    expect(component.layoutView).toEqual(true);

    component.actionGroups[1][0].action();
    component.actionGroups[1][1].action();
    expect(component.sort).toEqual(null);
    component.loaded = true;
    expect(component.actionGroups[1][1].disabled()).toEqual(true);
  });
});
