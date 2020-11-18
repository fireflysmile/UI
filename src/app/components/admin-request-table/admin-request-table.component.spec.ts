import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AdminRequestService } from 'src/app/services/api/admin-request.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockAdminRequests } from 'src/assets/data/adminRequest/mock-admin-requests';
import { mockAdminRequestColumns } from 'src/assets/data/mock-table-columns';
import { CardActionsModule } from '../card-actions/card-actions.module';
import { RectCardModule } from '../rect-card/rect-card.module';
import { TableLayoutEditorModule } from '../table-layout-editor/table-layout-editor.module';
import { TableModule } from '../table/table.module';

import { AdminRequestTableComponent } from './admin-request-table.component';

describe('AdminRequestTableComponent', () => {
  let component: AdminRequestTableComponent;
  let fixture: ComponentFixture<AdminRequestTableComponent>;
  let adminRequestService: AdminRequestService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRequestTableComponent],
      imports: [
        CardActionsModule,
        TableModule,
        TableLayoutEditorModule,
        RectCardModule,
        TestSharedModule,
      ],
      providers: [SubscriptionService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    adminRequestService = TestBed.inject(AdminRequestService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event when click action', () => {
    component.columns = mockAdminRequestColumns;
    component.displayableData = mockAdminRequests;
    fixture.detectChanges();

    component.actionGroups[0][0].action();

    const spyOnGetTasks = spyOn(
      adminRequestService,
      'getAdminRequests'
    ).and.returnValue(of([]));
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

    spyOnGetTasks.and.returnValue(of(mockAdminRequests));
    component.actionGroups[0][0].moreOptionsConfig.onApply(
      new Date(2010, 7, 9),
      new Date(2010, 7, 9)
    );
    expect(component.displayableData.length).toEqual(mockAdminRequests.length);

    component.displayableData = mockAdminRequests;
    component.actionGroups[1][0].action();

    component.selectAll = true;
    component.actionGroups[1][0].action();
    expect(component.displayableData.length).toEqual(mockAdminRequests.length);

    let downloadIe = false;
    const bkMsSaveOrOpenBlob = window.navigator.msSaveOrOpenBlob;
    window.navigator.msSaveOrOpenBlob = () => (downloadIe = true);
    component.actionGroups[1][0].action();
    expect(downloadIe).toEqual(true);
    window.navigator.msSaveOrOpenBlob = bkMsSaveOrOpenBlob;

    const bkBlob = window.Blob;
    window.Blob = null;
    component.actionGroups[1][0].action();
    window.Blob = bkBlob;

    component.filters = [
      {
        value: 'test',
        property: 'test',
        type: 'default',
      },
    ];
    expect(component.actionGroups[2][0].disabled()).toEqual(false);

    component.actionGroups[3][0].action();
    expect(component.layoutView).toEqual(true);

    component.actionGroups[2][0].action();
    component.actionGroups[2][1].action();
    expect(component.sort).toEqual(null);
    expect(component.actionGroups[2][1].disabled()).toEqual(true);
  });
});
