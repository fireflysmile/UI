import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsPageComponent } from './requests-page.component';
import { PageTitleModule } from 'src/app/components/page-title/page-title.module';
import { CardActionsModule } from 'src/app/components/card-actions/card-actions.module';
import { TableModule } from 'src/app/components/table/table.module';
import { CardModule } from 'src/app/components/card/card.module';
import { TableLayoutEditorModule } from 'src/app/components/table-layout-editor/table-layout-editor.module';
import { PageContentModule } from 'src/app/components/page-content/page-content.module';
import { PageActionsModule } from 'src/app/components/page-actions/page-actions.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { mockRequest } from 'src/assets/data/request/mock-request';

describe('RequestsPageComponent', () => {
  let component: RequestsPageComponent;
  let fixture: ComponentFixture<RequestsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestsPageComponent],
      imports: [
        PageTitleModule,
        CardActionsModule,
        TableModule,
        CardModule,
        TableLayoutEditorModule,
        PageContentModule,
        PageActionsModule,
        TestSharedModule,
      ],
      providers: [SubscriptionService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct ation when click on column action', () => {
    component.displayableData = mockRequest;
    component.selectAll = true;
    component.actionGroups[0][0].action();
    component.actionGroups[0][1].action();
    component.actionGroups[0][2].action();
    component.actionGroups[1][0].action();
    component.actionGroups[1][1].action();
    expect(component.columns.length).toEqual(13);
    component.filters = [
      {
        property: 'string',
        type: 'default',
        value: '',
      },
    ];
    expect(component.actionGroups[1][0].disabled()).toEqual(true);
    component.actionGroups[2][0].action();
    component.actionGroups[2][0].moreOptionsConfig.onSelectHideClick();
    expect(component.layoutView).toEqual(true);
    component.actionGroups[2][0].moreOptionsConfig.onReorderClick();
    expect(component.layoutView).toEqual(true);

    expect(
      component.actionGroups[2][0].moreOptionsConfig.hiddenColumns()
    ).toEqual(0);
    component.collateralOptions = [];
    component.instrumentTypeOptions = [];
    component.actionGroups[2][0].moreOptionsConfig.onShowHiddenClick();
  });
});
