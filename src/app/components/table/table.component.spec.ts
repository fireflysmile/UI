import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { TableComponent } from './table.component';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { DynamicFilterModule } from '../dynamic-filter/dynamic-filter.module';
import { RequestStatusModule } from '../request-status/request-status.module';
import { DestinationSegmentSelectorModule } from '../destination-segment-selector/destination-segment-selector.module';
import { InstrumentTypePipeModule } from 'src/app/pipes/instrument-type-pipe/instrument-type-pipe.module';
import { QuantityPipeModule } from 'src/app/pipes/quantity-pipe/quantity-pipe.module';
import { mockTableColumns } from 'src/assets/data/mock-table-columns';
import { mockRequest } from 'src/assets/data/request/mock-request';
import { By } from '@angular/platform-browser';

describe('TableComponent', () => {
  let component: TableComponent<any>;
  let fixture: ComponentFixture<TableComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [
        TestSharedModule,
        CheckboxModule,
        DynamicFilterModule,
        RequestStatusModule,
        DestinationSegmentSelectorModule,
        InstrumentTypePipeModule,
        QuantityPipeModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    // fake ie
    spyOnProperty(window.navigator, 'userAgent').and.returnValue('AMSIE ');
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct input data', () => {
    component.data = mockRequest;
    component.columns = null;
    component.columns = mockTableColumns;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show correct input data', () => {
    component.data = mockRequest;
    component.columns = mockTableColumns;
    fixture.detectChanges();
    const allRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(allRows.length).toEqual(mockRequest.length * 2);
  });

  it('should call remove even the reference is destroyed', () => {
    component.tableContainerRef = null;
    component.ngOnDestroy();
    expect(component).toBeTruthy();
  });

  it('should get correct total column length', fakeAsync(() => {
    component.data = mockRequest;
    component.columns = mockTableColumns;
    component.onWindowResize();
    tick(1000);
    fixture.detectChanges();
    component.totalColumnLength = 15;
    expect(component.totalColumns).toEqual([
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
    ]);
    fixture.detectChanges();
    component.onWindowResize();
    tick(1000);
  }));

  it('should sort column when set sort', fakeAsync(() => {
    component.data = mockRequest;
    component.columns = mockTableColumns;
    fixture.detectChanges();
    tick(1000);
    component.sort = null;
    expect(component.sortedColumn).toEqual(null);
    component.sort = {
      property: 'requestDate',
      order: 'desc',
    };
    expect(component.sortedColumn.property).toEqual('requestDate');

    component.toggleColumnSort(component.columns[0], 'asc');
    expect(component.sortedColumn.property).toEqual('requestDate');

    component.toggleColumnSort(component.columns[0], null);
    expect(component.sortedColumn.property).toEqual('requestDate');

    component.toggleColumnSort(component.columns[0], 'desc');
    component.toggleColumnSort(component.columns[0], null);
    expect(component.sortedColumn.property).toEqual('requestDate');
  }));

  it('should emit filter change when change filter', fakeAsync(() => {
    component.data = mockRequest;
    component.columns = mockTableColumns;
    fixture.detectChanges();
    tick(1000);
    const spyOnFilterChange = spyOn(component.filterChange, 'emit');
    component.onFilterChange();
    expect(spyOnFilterChange).toHaveBeenCalled();
    spyOnFilterChange.calls.reset();
    const spyOnCloseModal = spyOn(
      component.dynamicFilterRefs.first,
      'closeModal'
    );

    component.closeOtherFilters(component.dynamicFilterRefs.toArray()[0]);
    expect(spyOnCloseModal).not.toHaveBeenCalled();

    component.closeOtherFilters(null);
    expect(spyOnCloseModal).toHaveBeenCalled();

    component.columns = [null];
    component.onFilterChange();
    expect(spyOnFilterChange).toHaveBeenCalled();
    spyOnFilterChange.calls.reset();
    tick(1000);
  }));

  it('should set header z index when call set header z index', () => {
    component.setHeaderZIndex(
      (component.dataTableRef
        .nativeElement as unknown) as HTMLTableHeaderCellElement,
      10
    );
    expect(component.dataTableRef.nativeElement.style.zIndex).toEqual('10');
  });
});
