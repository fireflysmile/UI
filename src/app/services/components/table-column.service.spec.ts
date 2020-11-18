import { TestBed } from '@angular/core/testing';

import { TableColumnService } from './table-column.service';
import { mockLayoutConfig } from 'src/assets/data/mock-table-columns';
import { TRANSFER_INITIAL_LAYOUT_CONFIGS } from './column-config/transfer-page';
import { APPLICATION_INITIAL_LAYOUT_CONFIGS } from './column-config/application-table';
import { ASSIGNED_TASK_INITIAL_LAYOUT_CONFIGS } from './column-config/assigned-task-table';
import { ADMIN_REQUEST_INITIAL_LAYOUT_CONFIGS } from './column-config/admin-request-table';

describe('TableColumnService', () => {
  let service: TableColumnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableColumnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get correct initial request column configs', () => {
    service.requestColumnConfig = mockLayoutConfig;
    expect(service.initialRequestColumnConfigs.length).toEqual(13);

    let requestColumns = [];
    let requestColumnConfig;
    service.requestColumns$.subscribe((columns) => (requestColumns = columns));
    service.requestColumnConfig$.subscribe(
      (columns) => (requestColumnConfig = columns)
    );
    service.requestColumnConfig = [];
    expect(requestColumnConfig.length).toEqual(0);

    let transferColumns = [];
    let transferColumnConfig;

    service.transferColumns$.subscribe(
      (columns) => (transferColumns = columns)
    );
    service.transferColumnConfig$.subscribe(
      (columns) => (transferColumnConfig = columns)
    );
    expect(service.initialTransferColumnConfigs.length).toEqual(11);
    service.transferColumnConfig = TRANSFER_INITIAL_LAYOUT_CONFIGS;
    expect(transferColumnConfig.length).toEqual(11);

    let applicationColumnConfig;
    let applicationColumns;
    service.applicationColumnConfig$.subscribe(
      (columns) => (applicationColumnConfig = columns)
    );
    service.applicationColumns$.subscribe(
      (columns) => (applicationColumns = columns)
    );
    expect(service.initialApplicationColumnConfigs.length).toEqual(7);
    service.applicationColumnConfig = APPLICATION_INITIAL_LAYOUT_CONFIGS;
    expect(applicationColumnConfig.length).toEqual(7);
    expect(applicationColumns.length).toEqual(7);

    let taskColumns;
    let taskColumnConfig;
    service.taskColumns$.subscribe((columns) => (taskColumns = columns));
    service.taskColumnConfig$.subscribe(
      (columns) => (taskColumnConfig = columns)
    );
    expect(service.initialTaskColumnConfigs.length).toEqual(9);
    service.taskColumnConfig = ASSIGNED_TASK_INITIAL_LAYOUT_CONFIGS;
    expect(taskColumns.length).toEqual(9);

    let memberApplicationColumns;
    let memberApplicationColumnConfig;
    service.memberApplicationColumns$.subscribe(
      (columns) => (memberApplicationColumns = columns)
    );
    service.memberApplicationColumnConfig$.subscribe(
      (columns) => (memberApplicationColumnConfig = columns)
    );
    expect(service.initialMemberApplicationColumnConfigs.length).toEqual(5);
    service.memberApplicationColumnConfig = APPLICATION_INITIAL_LAYOUT_CONFIGS;
    expect(memberApplicationColumns.length).toEqual(7);

    let adminRequestColumns;
    let adminRequestColumnConfig;
    service.adminRequestColumns$.subscribe(
      (columns) => (adminRequestColumns = columns)
    );
    service.adminRequestColumnConfig$.subscribe(
      (columns) => (adminRequestColumnConfig = columns)
    );
    expect(service.initialAdminRequestColumnConfigs.length).toEqual(8);
    service.adminRequestColumnConfig = ADMIN_REQUEST_INITIAL_LAYOUT_CONFIGS;
    expect(adminRequestColumns.length).toEqual(8);

    let splitApplicationColumns;
    let splitApplicationColumnConfig;
    service.splitApplicationColumns$.subscribe(
      (columns) => (splitApplicationColumns = columns)
    );
    service.splitApplicationColumnConfig$.subscribe(
      (columns) => (splitApplicationColumnConfig = columns)
    );
    expect(service.initialSplitApplicationColumnConfigs.length).toEqual(9);
    service.splitApplicationColumnConfig = ASSIGNED_TASK_INITIAL_LAYOUT_CONFIGS;
    expect(splitApplicationColumns.length).toEqual(9);

    let applicationRequestColumns;
    service.applicationRequestColumns$.subscribe(
      (columns) => (applicationRequestColumns = columns)
    );
    let applicationRequestColumnConfig;
    service.applicationRequestColumnConfig$.subscribe(
      (columns) => (applicationRequestColumnConfig = columns)
    );
    expect(service.initialApplicationRequestColumnConfigs.length).toEqual(7);
    service.applicationRequestColumnConfig =
      service.initialApplicationRequestColumnConfigs;
    expect(applicationRequestColumns.length).toEqual(7);
    expect(applicationRequestColumnConfig.length).toEqual(7);

    let olocTaskColumns;
    service.olocTaskColumns$.subscribe(
      (columns) => (olocTaskColumns = columns)
    );
    let olocTaskColumnConfig;
    service.olocTaskColumnConfig$.subscribe(
      (columns) => (olocTaskColumnConfig = columns)
    );
    expect(service.initialOlocTaskColumnConfigs.length).toEqual(7);
    service.olocTaskColumnConfig = service.initialOlocTaskColumnConfigs;
    expect(olocTaskColumns.length).toEqual(7);
    expect(olocTaskColumnConfig.length).toEqual(7);

    let simReportColumns;
    service.simReportColumns$.subscribe(
      (columns) => (simReportColumns = columns)
    );
    let simReportColumnConfig;
    service.simReportColumnConfig$.subscribe(
      (columns) => (simReportColumnConfig = columns)
    );
    expect(service.initialSimReportColumnConfigs.length).toEqual(6);
    service.simReportColumnConfig = service.initialSimReportColumnConfigs;
    expect(simReportColumns.length).toEqual(6);
    expect(simReportColumnConfig.length).toEqual(6);

    let olocSplitApplicationColumns;
    service.olocSplitApplicationColumns$.subscribe(
      (columns) => (olocSplitApplicationColumns = columns)
    );
    let olocSplitApplicationColumnConfig;
    service.olocSplitApplicationColumnConfig$.subscribe(
      (columns) => (olocSplitApplicationColumnConfig = columns)
    );
    expect(service.initialOlocSplitApplicationColumnConfigs.length).toEqual(8);
    service.olocSplitApplicationColumnConfig =
      service.initialOlocSplitApplicationColumnConfigs;
    expect(olocSplitApplicationColumns.length).toEqual(8);
    expect(olocSplitApplicationColumnConfig.length).toEqual(8);

    let tradeColumns;
    service.tradeColumns$.subscribe(
      (columns) => (tradeColumns = columns)
    );
    let tradeColumnConfig;
    service.tradeColumnConfig$.subscribe(
      (columns) => (tradeColumnConfig = columns)
    );
    expect(service.initialTradeColumnConfigs.length).toEqual(13);
    service.tradeColumnConfig =
      service.initialTradeColumnConfigs;
    expect(tradeColumns.length).toEqual(13);
    expect(tradeColumnConfig.length).toEqual(13);

    localStorage.removeItem('CM_EDART_FILTERS');
    expect(service.tradeColumnFilters.length).toEqual(0);
    service.tradeColumnFilters = [];
    expect(service.tradeColumnFilters.length).toEqual(0);

    localStorage.removeItem('CM_REQUEST_COLUMNS');
    localStorage.removeItem('CM_TRANSFER_COLUMNS');
    localStorage.removeItem('CM_APPLICATION_COLUMNS');
    localStorage.removeItem('CM_TASK_COLUMNS');
    localStorage.removeItem('CM_MEMBER_APPLICATION_COLUMNS');
    localStorage.removeItem('CM_ADMIN_REQUEST_COLUMNS');
    localStorage.removeItem('CM_SPLIT_APPLICATION_COLUMNS');
    localStorage.removeItem('CM_APPLICATION_REQUEST_COLUMNS');
    localStorage.removeItem('CM_OLOC_TASK_COLUMNS');
    localStorage.removeItem('CM_SIM_REPORT_COLUMNS');
    localStorage.removeItem('CM_OLOC_SPLIT_APPLICATION_COLUMNS');
    localStorage.removeItem('CM_EDART_COLUMNS');
    localStorage.removeItem('CM_EDART_FILTERS');

    (service as any)._initializeColumns(); // use any to call private method
    expect(transferColumns.length).toEqual(11);
    expect(requestColumns.length).toEqual(13);
  });
});
