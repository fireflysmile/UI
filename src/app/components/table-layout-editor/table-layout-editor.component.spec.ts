import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLayoutEditorComponent } from './table-layout-editor.component';
import { CardActionsModule } from '../card-actions/card-actions.module';
import { TableLayoutItemModule } from '../table-layout-item/table-layout-item.module';
import { CardModule } from '../card/card.module';
import { mockLayoutConfig } from 'src/assets/data/mock-table-columns';
import { RequestItem } from 'src/app/models/request-item';
import { MessageModule } from '../message/message.module';
import { MessageService } from '../message/message.service';

describe('TableLayoutEditorComponent', () => {
  let component: TableLayoutEditorComponent<RequestItem>;
  let fixture: ComponentFixture<TableLayoutEditorComponent<RequestItem>>;
  let messageService: MessageService;
  const event: any = {};

  beforeEach(async(() => {
    window.addEventListener = (eventName, action) => {
      event[eventName] = action;
    };
    TestBed.configureTestingModule({
      declarations: [TableLayoutEditorComponent],
      imports: [
        CardActionsModule,
        TableLayoutItemModule,
        CardModule,
        MessageModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableLayoutEditorComponent);
    messageService = TestBed.inject(MessageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set layout', () => {
    component.layouts = mockLayoutConfig;
    fixture.detectChanges();
    expect(component.visibleLayouts).toEqual(13);
  });

  it('should update element when click to element', () => {
    component.layouts = mockLayoutConfig;
    fixture.detectChanges();
    const mouseEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    component.layouts.forEach((layout) => {
      component.onHandlePress(mouseEvent, layout, component.tableItems.first);
      expect(component.handling).toEqual(layout);
      component.onMouseEnterToLayoutItem(10);
      expect(component.placedIndex).toEqual(10);
      event.mouseup();
      event.mousemove();
      component.onMouseEnterToLayoutItem(10);
      expect(component.handling).toEqual(null);
      expect(component.placedIndex).toEqual(-1);
    });
    (component as any)._createReorderedLayouts();
    expect(component.layouts.length).toEqual(13);
  });

  it('should show item when click on visibility button', () => {
    component.layouts = mockLayoutConfig;
    fixture.detectChanges();
    component.onVisibilityButtonClick(component.layouts[0]);
    expect(component.layouts[0].show).toEqual(false);
    component.onVisibilityButtonClick(component.layouts[0]);
    expect(component.layouts[0].show).toEqual(true);
    component.layouts.forEach((layout) => {
      if (layout.show) {
        component.onVisibilityButtonClick(layout);
      }
    });
  });

  it('should emit event when click action', () => {
    const spyOnSaveClick = spyOn(component.saveClick, 'emit');
    component.actionGroups[0][0].action(); // do nothing
    component.actionGroups[0][1].action();
    expect(spyOnSaveClick).toHaveBeenCalled();

    const spyOnCancelClick = spyOn(component.cancelClick, 'emit');
    component.actionGroups[0][3].action();
    expect(spyOnCancelClick).toHaveBeenCalled();

    component.actionGroups[0][2].action();
    expect(component.layouts).toEqual(component.initialConfigs);
  });

  it('should call action', () => {
    component.label = 'test';
    expect(component.actionGroups[0][0].label).toEqual('test');
    component.label = null;
    expect(component.actionGroups[0][0].label).toEqual('Reorder Columns');

    component.actionGroups[0][0].action();
    expect(component.actionGroups[0][0].disabled()).toEqual(true);

    const spyOnOpenMessage = spyOn(messageService, 'open');
    const spyOnSaveClick = spyOn(component.saveClick, 'emit');
    component.actionGroups[0][1].action();
    expect(spyOnOpenMessage).toHaveBeenCalled();
    expect(spyOnSaveClick).toHaveBeenCalled();

    component.actionGroups[0][2].action();
    expect(component.layouts.length).toEqual(0);

    const spyOnCancelClick = spyOn(component.cancelClick, 'emit');
    component.actionGroups[0][3].action();
    expect(spyOnCancelClick).toHaveBeenCalled();

  });
});
