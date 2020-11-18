import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { TransferPageComponent } from './transfer-page.component';
import { PageTitleModule } from 'src/app/components/page-title/page-title.module';
import { ToggleFilterModule } from 'src/app/components/toggle-filter/toggle-filter.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { CardActionsModule } from 'src/app/components/card-actions/card-actions.module';
import { TableModule } from 'src/app/components/table/table.module';
import { CardModule } from 'src/app/components/card/card.module';
import { TableLayoutEditorModule } from 'src/app/components/table-layout-editor/table-layout-editor.module';
import { PageContentModule } from 'src/app/components/page-content/page-content.module';
import { PageActionsModule } from 'src/app/components/page-actions/page-actions.module';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { MessageService } from 'src/app/components/message/message.service';
import { mockTranfers } from 'src/assets/data/transfer/mock-transfers';

describe('TransferPageComponent', () => {
  let component: TransferPageComponent;
  let fixture: ComponentFixture<TransferPageComponent>;
  let messageService: MessageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransferPageComponent],
      imports: [
        PageTitleModule,
        ToggleFilterModule,
        TestSharedModule,
        CardActionsModule,
        TableModule,
        CardModule,
        TableLayoutEditorModule,
        PageContentModule,
        PageActionsModule,
      ],
      providers: [SubscriptionService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    messageService = TestBed.inject(MessageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct ation when click on column action', () => {
    const spyOnFileInputClick = spyOn(
      component.fileInputRef.nativeElement,
      'click'
    );
    component.actionGroups[0][0].action();
    component.filters = [
      {
        property: 'string',
        type: 'default',
        value: '',
      },
    ];
    expect(component.actionGroups[0][1].disabled()).toEqual(true);
    component.actionGroups[0][1].action();
    component.actionGroups[0][2].action();
    component.actionGroups[0][3].action();
    expect(component.filters).toEqual([]);
    component.actionGroups[0][3].moreOptionsConfig.onSelectHideClick();
    expect(component.layoutView).toEqual(true);
    component.actionGroups[0][3].moreOptionsConfig.onReorderClick();
    expect(component.layoutView).toEqual(true);
    component.actionGroups[0][3].moreOptionsConfig.onShowHiddenClick();
    expect(
      component.actionGroups[0][3].moreOptionsConfig.hiddenColumns()
    ).toEqual(0);
    expect(spyOnFileInputClick).toHaveBeenCalled();
  });

  it('should set filter', () => {
    component.displayableData = _.cloneDeep(mockTranfers);
    component.segmentOptions = [
      {
        // value for filter
        value: 'CM',
        label: 'CM',
      },
    ];
    component.callSetColumnFilters();
    component.columns.forEach((item) => {
      if (item.property === 'destinationSegment') {
        expect(item.filterOptions[0].label).toEqual('CM');
      }
    });
  });

  it('should toggle filter change', () => {
    component.displayableData = mockTranfers;
    (component as any)._originalData = mockTranfers;
    component.toggleableFilterChange();
    expect(
      _.filter(component.displayableData, { selected: false }).length
    ).toEqual(component.displayableData.length);
  });
  it('should show error if file upload wrong format', () => {
    const spyOnMessageOpen = spyOn(messageService, 'open');
    component.onFileUpload({
      target: {
        files: [{ type: 'application/vnd.ms-excel' }],
      },
    } as any); // fake upload file
    expect(spyOnMessageOpen).not.toHaveBeenCalled();
    component.onFileUpload({
      target: {
        files: [{ type: 'noexcel' }],
      },
    } as any); // fake upload file
    expect(spyOnMessageOpen).toHaveBeenCalled();
  });

  it('should get clone original data', () => {
    component.displayableData = mockTranfers;
    (component as any)._originalData = mockTranfers;
    component.segment = 'FO';
    component.collateral = 'SECURITY DEPOSIT';
    component.instrumentType = 'newInstrumentType';
    expect(component.getClonedOriginalData().length).toEqual(0);
  });
});
