import { Component, NgModule, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationExtras, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApplicationItem } from 'src/app/models/application-item';
import { SearchApplicationFilter } from 'src/app/models/search-application-filter';
import { Nl2brPipeModule } from 'src/app/pipes/nl2br-pipe/nl2br-pipe.module';
import { ApplicationService } from 'src/app/services/api/application.service';
import { APPLICATION_INITIAL_LAYOUT_CONFIGS } from 'src/app/services/components/column-config/application-table';
import { MEMBER_APPLICATION_INITIAL_COLUMNS } from 'src/app/services/components/column-config/member-application-table';
import { TableColumnService } from 'src/app/services/components/table-column.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockApplication } from 'src/assets/data/application/mock-application';
import { mockMemberApplications } from 'src/assets/data/application/mock-member-applications';
import { CardActionsModule } from '../card-actions/card-actions.module';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ModalModule } from '../modal/modal.module';
import { ModalService } from '../modal/modal.service';
import { RectCardModule } from '../rect-card/rect-card.module';
import { TableLayoutEditorModule } from '../table-layout-editor/table-layout-editor.module';
import { TableModule } from '../table/table.module';

import { MemberApplicationTableComponent } from './member-application-table.component';

@Component({
  selector: 'app-test-modal',
  template: `<div>
    <app-member-application-table></app-member-application-table><app-modal-outlet></app-modal-outlet>
  </div>`,
})
class TestComponent {
  @ViewChild(MemberApplicationTableComponent, { static: true }) appComponentRef: MemberApplicationTableComponent;

  constructor() {}
}

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [ModalModule, Nl2brPipeModule],
  exports: [ModalModule],
})
class TestModule {}

describe('MemberApplicationTableComponent', () => {
  let component: MemberApplicationTableComponent;
  let fixture: ComponentFixture<TestComponent>;
  let applicationService: ApplicationService;
  let modalService: ModalService;
  let router: Router;
  let spyOnGetApplications: jasmine.Spy<(filters: SearchApplicationFilter) => Observable<ApplicationItem[]>>;
  let spyOnNavigate: jasmine.Spy<(commands: any[], extras?: NavigationExtras) => Promise<boolean>>;
  let tableColumnService: TableColumnService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberApplicationTableComponent, TestComponent],
      imports: [CardActionsModule, RectCardModule, TableModule, TableLayoutEditorModule, TestSharedModule, TestModule],
      providers: [SubscriptionService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    applicationService = TestBed.inject(ApplicationService);
    tableColumnService = TestBed.inject(TableColumnService);
    modalService = TestBed.inject(ModalService);
    router = TestBed.inject(Router);
    spyOnNavigate = spyOn(router, 'navigate');
    spyOnGetApplications = spyOn(applicationService, 'searchApplications').and.returnValue(of(mockApplication));
    spyOn(applicationService, 'getMemberApplications').and.returnValue(of(mockMemberApplications));
    const wrapperComponent = fixture.componentInstance;
    fixture.detectChanges();
    component = wrapperComponent.appComponentRef;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter', () => {
    let onClose;
    const spyOnOpenModal = spyOn(modalService, 'open').and.callFake((_component, data) => {
      onClose = data.onClose;
      return null;
    });

    tableColumnService.memberApplicationColumnConfig = APPLICATION_INITIAL_LAYOUT_CONFIGS;
    component.columns = MEMBER_APPLICATION_INITIAL_COLUMNS;
    fixture.detectChanges();

    component.selectAll = true;
    expect(component.isDeletable).toEqual(false);

    component.actionGroups[1][0].action();
    component.actionGroups[1][0].moreOptionsConfig.onApply(new Date(2010, 7, 6), new Date(2010, 7, 6));
    component.actionGroups[1][0].action();
    expect(component.displayableData.length).toEqual(100);
    component.actionGroups[1][0].moreOptionsConfig.onApply(new Date(2010, 7, 6), new Date(2010, 7, 6));
    expect(component.displayableData.length).toEqual(100);
    component.actionGroups[1][0].moreOptionsConfig.onApply(new Date(2010, 7, 6), new Date(2011, 7, 6));
    expect(component.displayableData.length).toEqual(100);
    component.actionGroups[1][0].moreOptionsConfig.onApply(null, null);
    component.actionGroups[1][0].moreOptionsConfig.onApply(null, null);
    expect(component.displayableData.length).toEqual(100);

    component.selectAll = false;
    component.actionGroups[1][1].action();
    component.selectAll = true;
    component.actionGroups[1][1].action();
    expect(component.hasSelected).toEqual(true);

    component.filters = [
      {
        value: 'test',
        property: 'test',
        type: 'default',
      },
    ];
    expect(component.actionGroups[1][2].disabled()).toEqual(false);
    component.actionGroups[1][2].action();
    expect(component.filters.length).toEqual(0);

    component.sort = {
      property: 'requestDate',
      order: 'desc',
    };
    expect(component.actionGroups[1][3].disabled()).toEqual(false);
    component.actionGroups[1][3].action();
    expect(component.sort).toEqual(null);

    component.actionGroups[0][0].action();
    expect(spyOnOpenModal).toHaveBeenCalled();
    const spyOnDeleteApplication = spyOn(applicationService, 'deleteApplications').and.returnValue(of({} as any));
    onClose(false);
    expect(spyOnDeleteApplication).not.toHaveBeenCalled();
    onClose(true);
    spyOnOpenModal.calls.reset();
    expect(spyOnDeleteApplication).toHaveBeenCalled();

    component.actionGroups[2][0].action();
    expect(component.layoutView).toEqual(true);

    component.columns[0].routerLinkClick(mockMemberApplications[0]);
    expect(spyOnNavigate).toHaveBeenCalled();
    spyOnNavigate.calls.reset();

    const mockMemberApplication = mockMemberApplications[0];
    mockMemberApplication.status = 'In Progress';
    mockMemberApplication.requestType = 'Change in Director';
    component.columns[0].routerLinkClick(mockMemberApplications[0]);
    expect(spyOnOpenModal).toHaveBeenCalled();
    spyOnOpenModal.calls.reset();
    onClose(true);

    expect(spyOnOpenModal).toHaveBeenCalled();
    spyOnOpenModal.calls.reset();
    component.columns[0].routerLinkClick(mockMemberApplications[0]);
    expect(spyOnOpenModal).toHaveBeenCalled();
    spyOnOpenModal.calls.reset();
    onClose(false);
    expect(spyOnOpenModal).toHaveBeenCalled();
    spyOnOpenModal.calls.reset();

    tableColumnService.memberApplicationColumnConfig = [];
    expect(component.columns.length).toEqual(0);
  });
});
