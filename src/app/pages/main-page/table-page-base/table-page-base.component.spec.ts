import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePageBaseComponent } from './table-page-base.component';
import { RequestItem } from 'src/app/models/request-item';
import { mockTableColumns } from 'src/assets/data/mock-table-columns';
import { mockRequest } from 'src/assets/data/request/mock-request';
import { Component } from '@angular/core';
@Component({
  selector: 'app-test-component',
  template: `<div></div>`,
})
class TestComponent extends TablePageBaseComponent<RequestItem> {
  constructor() {
    super([], []);
  }
}

describe('TablePageBaseComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [
        {
          provide: Array,
          useValue: [],
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select all when click select all', () => {
    (component as any)._originalData = mockRequest;
    component.columns = mockTableColumns;
    component.createDisplayableData();
    fixture.detectChanges();
    component.selectAll = true;
    expect(component.selectAll).toEqual(true);
    expect(component.selectedRows.length).toEqual(50);
    expect(component.hasSelected).toEqual(true);

    component.sort = {
      property: 'field',
      order: 'desc',
    };
    component.createDisplayableData();
    expect(component.selectedRows.length).toEqual(50);
  });

  it('should filter data correctly', () => {
    (component as any)._originalData = mockRequest;
    component.columns = mockTableColumns;
    fixture.detectChanges();
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(50);

    (component as any)._clearAllSort();
    expect(component.columns.filter((c) => c.sortDirection).length).toEqual(0);

    (component as any)._clearAllSearch();
    expect(component.filters).toEqual([]);

    (component as any)._setColumnFilters();
    expect(component.columns.filter((c) => c.filterOptions).length).toEqual(13);

    component.filters = [
      {
        value: '',
        property: '',
        type: 'default',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(50);

    component.filters = [
      {
        value: ['test'],
        property: '',
        type: 'default',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(50);

    component.filters = [
      {
        value: {
          start: '',
          end: '',
        },
        property: '',
        type: 'time',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(50);

    component.filters = [
      {
        value: {
          start: '',
          end: '',
        },
        property: '',
        type: 'date',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(50);

    component.filters = [
      {
        value: {
          start: new Date(2010, 7, 5),
          end: new Date(2010, 7, 5),
        },
        property: '',
        type: 'date',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(0);

    component.filters = [
      {
        value: {
          type: 'default',
          value: 'test',
        },
        property: component.columns[0].property,
        type: 'quantity',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(0);

    component.filters = [
      {
        value: {
          type: 'default',
          value: null,
        },
        property: component.columns[0].property,
        type: 'quantity',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(50);

    component.filters = [
      {
        value: {
          type: 'eq',
          value: 'test',
        },
        property: component.columns[0].property,
        type: 'quantity',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(0);

    component.filters = [
      {
        value: {
          type: 'eq',
          value: null,
        },
        property: component.columns[0].property,
        type: 'quantity',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(50);

    component.filters = [
      {
        value: {
          type: 'lt',
          value: 'test',
        },
        property: component.columns[0].property,
        type: 'quantity',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(0);

    component.filters = [
      {
        value: {
          type: 'lt',
          value: null,
        },
        property: component.columns[0].property,
        type: 'quantity',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(50);

    component.filters = [
      {
        value: {
          type: 'gt',
          value: 'test',
        },
        property: component.columns[0].property,
        type: 'quantity',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(0);

    component.filters = [
      {
        value: {
          type: 'lte',
          value: 'test',
        },
        property: component.columns[0].property,
        type: 'quantity',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(0);
    expect(component.displayableData.length).toEqual(0);

    component.filters = [
      {
        value: {
          type: 'gte',
          value: '2020',
        },
        property: component.columns[0].property,
        type: 'quantity',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(0);

    component.filters = [
      {
        value: {
          type: 'range',
          value: {
            start: 'test',
            end: 'test',
          },
        },
        property: component.columns[0].property,
        type: 'quantity',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(0);

    component.filters = [
      {
        value: {
          type: 'range',
          value: {
            start: null,
            end: null,
          },
        },
        property: component.columns[0].property,
        type: 'quantity',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(50);

    component.filters = [
      {
        value: {
          type: 'range',
          value: {
            start: null,
            end: 'test',
          },
        },
        property: component.columns[0].property,
        type: 'quantity',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(0);

    component.filters = [
      {
        value: {
          type: 'range',
          value: null,
        },
        property: component.columns[0].property,
        type: 'quantity',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(50);

    component.filters = [
      {
        value: {
          type: 'gte',
          value: '',
        },
        property: 'instrumentId',
        type: 'quantity',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(50);

    component.filters = [
      {
        value: {
          type: 'lte',
          value: '',
        },
        property: 'instrumentId',
        type: 'quantity',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(50);

    component.filters = [
      {
        value: {
          type: 'gt',
          value: '',
        },
        property: 'instrumentId',
        type: 'quantity',
      },
    ];
    component.createDisplayableData();
    expect(component.displayableData.length).toEqual(50);
  });
});
