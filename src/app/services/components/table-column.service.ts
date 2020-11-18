import { Injectable } from '@angular/core';
import {TableColumn} from '../../models/table-column';
import { FilterChangeEvent } from '../../models/filter-change-event';
import {RequestItem} from '../../models/request-item';
import {BehaviorSubject, Observable} from 'rxjs';
import {LayoutConfig} from '../../models/layout-config';
import {map} from 'rxjs/operators';
import {TransferItem} from '../../models/transfer-item';
import {ApplicationItem} from '../../models/application-item';
import {AdminRequestItem} from '../../models/admin-request-item';
import {TaskItem} from '../../models/task-item';
import {ApplicationRequestItem} from '../../models/application-request-item';
import {TradeItem} from '../../models/trade-item';
import {REQUEST_INITIAL_COLUMNS, REQUEST_INITIAL_LAYOUT_CONFIGS} from './column-config/request-page';
import {TRANSFER_INITIAL_COLUMNS, TRANSFER_INITIAL_LAYOUT_CONFIGS} from './column-config/transfer-page';
import {
  APPLICATION_INITIAL_COLUMNS,
  APPLICATION_INITIAL_LAYOUT_CONFIGS
} from './column-config/application-table';
import {ASSIGNED_TASK_INITIAL_COLUMNS, ASSIGNED_TASK_INITIAL_LAYOUT_CONFIGS} from './column-config/assigned-task-table';
import {
  MEMBER_APPLICATION_INITIAL_COLUMNS,
  MEMBER_APPLICATION_INITIAL_LAYOUT_CONFIGS
} from './column-config/member-application-table';
import {
  EDART_INITIAL_COLUMNS,
  EDART_INITIAL_LAYOUT_CONFIGS
} from './column-config/trade-table';
import {ADMIN_REQUEST_INITIAL_COLUMNS, ADMIN_REQUEST_INITIAL_LAYOUT_CONFIGS} from './column-config/admin-request-table';
import {APPLICATION_REQUEST_INITIAL_COLUMNS, APPLICATION_REQUEST_INITIAL_LAYOUT_CONFIGS} from './column-config/application-request-table';
import {OLOC_ASSIGNED_TASK_INITIAL_COLUMNS, OLOC_ASSIGNED_TASK_INITIAL_LAYOUT_CONFIGS} from './column-config/oloc-assigned-task-table';
import {SIM_REPORT_INITIAL_COLUMNS, SIM_REPORT_INITIAL_LAYOUT_CONFIGS} from './column-config/sim-report-table';
// tslint:disable-next-line:max-line-length
import {OLOC_SPLIT_APPLICATION_INITIAL_COLUMNS, OLOC_SPLIT_APPLICATION_INITIAL_LAYOUT_CONFIGS} from './column-config/oloc-split-application-table';
import { CollateralDetailsItem } from 'src/app/models/collateral-details-item';
import {  COLLATERAL_DETAILS_INITIAL_COLUMNS,
          COLLATERAL_DETAILS_INITIAL_LAYOUT_CONFIGS,
          COLLATERAL_DETAILS_INITIAL_LAYOUT_CONFIGS_SECURITY,
          COLLATERAL_EXCESS_DETAILS_INITIAL_COLUMNS,
          COLLATERAL_EXCESS_DETAILS_INITIAL_LAYOUT_CONFIGS } from './column-config/collateral-details';
import { CollateralExcessDetailsItem } from 'src/app/models/collateral-excess-details-item';

export function storeToStorage<T>(key: string, item: T): void {
  localStorage.setItem(key, JSON.stringify(item));
}

export function getFromStorage<T>(key: string): T {
  return JSON.parse(localStorage.getItem(key));
}

@Injectable({
  providedIn: 'root'
})
export class TableColumnService {
  /**
   * ------------------------------------------
   * columns configurations for Request Page
   * ------------------------------------------
   */
  // available request columns
  private readonly _requestColumns: TableColumn<RequestItem>[] = REQUEST_INITIAL_COLUMNS;
  // initial request column config
  private readonly _initialRequestColumnConfig: LayoutConfig<RequestItem>[] = REQUEST_INITIAL_LAYOUT_CONFIGS;
  // request column config subject
  private readonly _requestColumnConfig$:
    BehaviorSubject<LayoutConfig<RequestItem>[]> = new BehaviorSubject<LayoutConfig<RequestItem>[]>(this._initialRequestColumnConfig);
  // request column key
  private readonly _requestColumnKey = 'CM_REQUEST_COLUMNS';
  /**
   * ------------------------------------------
   * columns configurations for collateral details
   * ------------------------------------------
   */
  // available collateral details columns
  private readonly _collateralDetailsColumns: TableColumn<CollateralDetailsItem>[] = COLLATERAL_DETAILS_INITIAL_COLUMNS;
  // initial collateral details column config
  private readonly _initialCollateralDetailsColumnConfig: LayoutConfig<CollateralDetailsItem>[] = COLLATERAL_DETAILS_INITIAL_LAYOUT_CONFIGS;
  // initial collateral details column config for security
  private readonly _initialCollateralDetailsColumnConfigSecurity: LayoutConfig<CollateralDetailsItem>[] =
    COLLATERAL_DETAILS_INITIAL_LAYOUT_CONFIGS_SECURITY;
  // collateral details column config subject
  private readonly _collateralDetailsColumnConfig$:
    BehaviorSubject<LayoutConfig<CollateralDetailsItem>[]> =
      new BehaviorSubject<LayoutConfig<CollateralDetailsItem>[]>(this._initialCollateralDetailsColumnConfig);
  // collateral details column config subject for security
  private readonly _collateralDetailsColumnConfigSecurity$:
    BehaviorSubject<LayoutConfig<CollateralDetailsItem>[]> =
      new BehaviorSubject<LayoutConfig<CollateralDetailsItem>[]>(this._initialCollateralDetailsColumnConfigSecurity);
  // collateral details column key
  private readonly _collateralDetailsColumnKey = 'CM_COLLATERAL_DETAILS_COLUMNS';

  // available collateral details columns
  private readonly _collateralExcessDetailsColumns: TableColumn<CollateralExcessDetailsItem>[] = COLLATERAL_EXCESS_DETAILS_INITIAL_COLUMNS;
  // initial collateral details column config
  private readonly _initialCollateralExcessDetailsColumnConfig: LayoutConfig<CollateralExcessDetailsItem>[] =
    COLLATERAL_EXCESS_DETAILS_INITIAL_LAYOUT_CONFIGS;
  // collateral details column config subject
  private readonly _collateralExcessDetailsColumnConfig$:
    BehaviorSubject<LayoutConfig<CollateralExcessDetailsItem>[]> =
      new BehaviorSubject<LayoutConfig<CollateralExcessDetailsItem>[]>(this._initialCollateralExcessDetailsColumnConfig);
  // collateral details column key
  private readonly _collateralExcessDetailsColumnKey = 'CM_COLLATERAL_EXCESS_DETAILS_COLUMNS';
  /**
   * ------------------------------------------
   * columns configurations for Transfer Page
   * ------------------------------------------
   */
  // available transfer columns
  private readonly _transferColumns: TableColumn<TransferItem>[] = TRANSFER_INITIAL_COLUMNS;
  // initial transfer column config
  private readonly _initialTransferColumnConfig: LayoutConfig<TransferItem>[] = TRANSFER_INITIAL_LAYOUT_CONFIGS;
  // transfer column config subject
  private readonly _transferColumnConfig$:
    BehaviorSubject<LayoutConfig<TransferItem>[]> = new BehaviorSubject<LayoutConfig<TransferItem>[]>(this._initialTransferColumnConfig);
  // transfer column key
  private readonly _transferColumnKey = 'CM_TRANSFER_COLUMNS';
  /**
   * ------------------------------------------
   * columns configuration for Search Application Page
   * ------------------------------------------
   */
  // available application columns
  private readonly _applicationColumns: TableColumn<ApplicationItem>[] = APPLICATION_INITIAL_COLUMNS;
  // initial application column config
  private readonly _initialApplicationColumnConfig: LayoutConfig<ApplicationItem>[] = APPLICATION_INITIAL_LAYOUT_CONFIGS;
  // application column config subject
  private readonly _applicationColumnConfig$:
    BehaviorSubject<LayoutConfig<ApplicationItem>[]> = new BehaviorSubject(this._initialApplicationColumnConfig);
  // application column key
  private readonly _applicationColumnKey = 'CM_APPLICATION_COLUMNS';
  /**
   * ------------------------------------------
   * columns configuration for Assigned Tasks
   * ------------------------------------------
   */
  // available task columns
  private readonly _taskColumns = ASSIGNED_TASK_INITIAL_COLUMNS;
  // initial task column config
  private readonly _initialTaskColumnConfig: LayoutConfig<TaskItem>[] = ASSIGNED_TASK_INITIAL_LAYOUT_CONFIGS;
  // task column config subject
  private readonly _taskColumnConfig$:
    BehaviorSubject<LayoutConfig<TaskItem>[]> = new BehaviorSubject(this._initialTaskColumnConfig);
  // task column key
  private readonly _taskColumnKey = 'CM_TASK_COLUMNS';
  /**
   * ------------------------------------------
   * columns configuration for Member Applications
   * ------------------------------------------
   */
  // available memberApplication columns
  private readonly _memberApplicationColumns = MEMBER_APPLICATION_INITIAL_COLUMNS;
  // initial memberApplication column config
  private readonly _initialMemberApplicationColumnConfig: LayoutConfig<ApplicationItem>[] = MEMBER_APPLICATION_INITIAL_LAYOUT_CONFIGS;
  // memberApplication column config subject
  private readonly _memberApplicationColumnConfig$:
    BehaviorSubject<LayoutConfig<ApplicationItem>[]> = new BehaviorSubject(this._initialMemberApplicationColumnConfig);
  // memberApplication column key
  private readonly _memberApplicationColumnKey = 'CM_MEMBER_APPLICATION_COLUMNS';

  /**
   * ------------------------------------------
   * columns configuration for Admin Requests page
   * ------------------------------------------
   */
  // available admin request columns
  private readonly _adminRequestColumns: TableColumn<AdminRequestItem>[] = ADMIN_REQUEST_INITIAL_COLUMNS;
  // initial admin request column config
  private readonly _initialAdminRequestColumnConfig: LayoutConfig<AdminRequestItem>[] = ADMIN_REQUEST_INITIAL_LAYOUT_CONFIGS;
  // admin request column config subject
  private readonly _adminRequestColumnConfig$:
    BehaviorSubject<LayoutConfig<AdminRequestItem>[]> = new BehaviorSubject(this._initialAdminRequestColumnConfig);
  // task column key
  private readonly _adminRequestColumnKey = 'CM_ADMIN_REQUEST_COLUMNS';

  /**
   * ------------------------------------------
   * columns configuration for Split Application
   * ------------------------------------------
   */
  // available split application columns
  private readonly _splitApplicationColumns: TableColumn<TaskItem>[] = ASSIGNED_TASK_INITIAL_COLUMNS;
  // initial split application column config
  private readonly _initialSplitApplicationColumnConfig: LayoutConfig<TaskItem>[] = ASSIGNED_TASK_INITIAL_LAYOUT_CONFIGS;
  // split application column config subject
  private readonly _splitApplicationColumnConfig$:
    BehaviorSubject<LayoutConfig<TaskItem>[]> = new BehaviorSubject(this._initialSplitApplicationColumnConfig);
  // task column key
  private readonly _splitApplicationColumnKey = 'CM_SPLIT_APPLICATION_COLUMNS';

  /**
   * ------------------------------------------
   * columns configurations for Application Request Page
   * ------------------------------------------
   */
  // available application request columns
  private readonly _applicationRequestColumns: TableColumn<ApplicationRequestItem>[] = APPLICATION_REQUEST_INITIAL_COLUMNS;
  // initial application request column config
  private readonly _initialApplicationRequestColumnConfig: LayoutConfig<ApplicationRequestItem>[]
    = APPLICATION_REQUEST_INITIAL_LAYOUT_CONFIGS;
  // application request column config subject
  private readonly _applicationRequestColumnConfig$:
    BehaviorSubject<LayoutConfig<ApplicationRequestItem>[]>
    = new BehaviorSubject<LayoutConfig<ApplicationRequestItem>[]>(this._initialApplicationRequestColumnConfig);
  // application request column key
  private readonly _applicationRequestColumnKey = 'CM_APPLICATION_REQUEST_COLUMNS';


  /**
   * ------------------------------------------
   * columns configuration for Oloc Assigned Tasks
   * ------------------------------------------
   */
  // available oloc task columns
  private readonly _olocTaskColumns = OLOC_ASSIGNED_TASK_INITIAL_COLUMNS;
  // initial oloc task column config
  private readonly _initialOlocTaskColumnConfig: LayoutConfig<TaskItem>[] = OLOC_ASSIGNED_TASK_INITIAL_LAYOUT_CONFIGS;
  // oloc task column config subject
  private readonly _olocTaskColumnConfig$:
    BehaviorSubject<LayoutConfig<TaskItem>[]> = new BehaviorSubject(this._initialOlocTaskColumnConfig);
  // oloc task column key
  private readonly _olocTaskColumnKey = 'CM_OLOC_TASK_COLUMNS';

  /**
   * ------------------------------------------
   * columns configuration for Sim Report Tasks
   * ------------------------------------------
   */
  // available sim report columns
  private readonly _simReportColumns = SIM_REPORT_INITIAL_COLUMNS;
  // initial sim report column config
  private readonly _initialSimReportColumnConfig: LayoutConfig<ApplicationItem>[] = SIM_REPORT_INITIAL_LAYOUT_CONFIGS;
  // sim report column config subject
  private readonly _simReportColumnConfig$:
    BehaviorSubject<LayoutConfig<ApplicationItem>[]> = new BehaviorSubject(this._initialSimReportColumnConfig);
  // sim report column key
  private readonly _simReportColumnKey = 'CM_SIM_REPORT_COLUMNS';

  /**
   * ------------------------------------------
   * columns configuration for Oloc Split Application Page
   * ------------------------------------------
   */
  // available application columns
  private readonly _olocSplitApplicationColumns: TableColumn<ApplicationItem>[] = OLOC_SPLIT_APPLICATION_INITIAL_COLUMNS;
  // initial application column config
  private readonly _initialOlocSplitApplicationColumnConfig: LayoutConfig<ApplicationItem>[]
    = OLOC_SPLIT_APPLICATION_INITIAL_LAYOUT_CONFIGS;
  // application column config subject
  private readonly _olocSplitApplicationColumnConfig$:
    BehaviorSubject<LayoutConfig<ApplicationItem>[]> = new BehaviorSubject(this._initialOlocSplitApplicationColumnConfig);
  // application column key
  private readonly _olocSplitApplicationColumnKey = 'CM_OLOC_SPLIT_APPLICATION_COLUMNS';

  /**
   * ------------------------------------------
   * columns configuration for Trade Table
   * ------------------------------------------
   */
  // available trade columns
  private readonly _tradeColumns: TableColumn<TradeItem>[] = EDART_INITIAL_COLUMNS;
  // initial trade column config
  private readonly _initialTradeColumnConfig: LayoutConfig<TradeItem>[] = EDART_INITIAL_LAYOUT_CONFIGS;
  // trade column config subject
  private readonly _tradeColumnConfig$:
    BehaviorSubject<LayoutConfig<TradeItem>[]> = new BehaviorSubject(this._initialTradeColumnConfig);
  // trade column key
  private readonly _tradeColumnKey = 'CM_EDART_COLUMNS';
  private readonly _tradeColumnFilersKey = 'CM_EDART_FILTERS';

  constructor() {
    this._initializeColumns();
  }

  /**
   * ------------------------------------------
   * columns methods for Request Page
   * ------------------------------------------
   */
  /**
   * return initial request column configs
   */
  get initialRequestColumnConfigs(): LayoutConfig<RequestItem>[] {
    return this._initialRequestColumnConfig.map(item => ({...item}));
  }

  /**
   * return request columns according to layout config
   */
  get requestColumns$(): Observable<TableColumn<RequestItem>[]> {
    return this._requestColumnConfig$.asObservable()
      .pipe(map(res => this._getOrderedRequestColumns(res)));
  }

  /**
   * return request column configs
   */
  get requestColumnConfig$(): Observable<LayoutConfig<RequestItem>[]> {
    return this._requestColumnConfig$.asObservable();
  }

  /**
   * save request columns layout config
   * @param columns columns
   */
  set requestColumnConfig(columns: LayoutConfig<RequestItem>[]) {
    storeToStorage(this._requestColumnKey, columns);
    this._requestColumnConfig$.next(columns);
  }

  /**
   * get ordered request columns
   * @param config column layout config
   */
  private _getOrderedRequestColumns(config: LayoutConfig<RequestItem>[]): TableColumn<RequestItem>[] {
    const visibleColumns = [...config].filter(item => item.show);
    const requestColumnMap = {};

    this._requestColumns.forEach(item => requestColumnMap[item.property] = item);

    return visibleColumns.map(item => requestColumnMap[item.property]);
  }

  /**
   * ------------------------------------------
   * columns methods for collateral details
   * ------------------------------------------
   */
  /**
   * return initial collateral details column configs
   */
  get initialCollateralDetailsColumnConfigs(): LayoutConfig<CollateralDetailsItem>[] {
    return this._initialCollateralDetailsColumnConfig.map(item => ({...item}));
  }

  /**
   * return initial collateral details column configs for securtiy
   */
  get initialCollateralDetailsColumnConfigSecuritys(): LayoutConfig<CollateralDetailsItem>[] {
    return this._initialCollateralDetailsColumnConfigSecurity.map(item => ({...item}));
  }

  /**
   * return collateral details columns according to layout config
   */
  get collateralDetailsColumns$(): Observable<TableColumn<CollateralDetailsItem>[]> {
    return this._collateralDetailsColumnConfig$.asObservable()
      .pipe(map(res => this._getOrderedCollateralDetailsColumns(res)));
  }

  /**
   * return collateral details columns according to layout config for security
   */
  get collateralDetailsColumnsSecurity$(): Observable<TableColumn<CollateralDetailsItem>[]> {
    return this._collateralDetailsColumnConfigSecurity$.asObservable()
      .pipe(map(res => this._getOrderedCollateralDetailsColumns(res)));
  }

  /**
   * return collateral details column configs
   */
  get collateralDetailsColumnConfig$(): Observable<LayoutConfig<CollateralDetailsItem>[]> {
    return this._collateralDetailsColumnConfig$.asObservable();
  }

  /**
   * return collateral details column configs for security
   */
  get collateralDetailsColumnConfigSecurity$(): Observable<LayoutConfig<CollateralDetailsItem>[]> {
    return this._collateralDetailsColumnConfigSecurity$.asObservable();
  }

  /**
   * save collateral details columns layout config
   * @param columns columns
   */
  set collateralDetailsColumnConfig(columns: LayoutConfig<CollateralDetailsItem>[]) {
    storeToStorage(this._collateralDetailsColumnKey, columns);
    this._collateralDetailsColumnConfig$.next(columns);
  }

  /**
   * save collateral details columns layout config for security
   * @param columns columns
   */
  set collateralDetailsColumnConfigSecurity(columns: LayoutConfig<CollateralDetailsItem>[]) {
    storeToStorage(this._collateralDetailsColumnKey, columns);
    this._collateralDetailsColumnConfigSecurity$.next(columns);
  }

  /**
   * get ordered collateral details columns
   * @param config column layout config
   */
  private _getOrderedCollateralDetailsColumns(config: LayoutConfig<CollateralDetailsItem>[]): TableColumn<CollateralDetailsItem>[] {
    const visibleColumns = [...config].filter(item => item.show);
    const columnMap = {};

    this._collateralDetailsColumns.forEach(item => columnMap[item.property] = item);

    return visibleColumns.map(item => columnMap[item.property]);
  }

  /**
   * return initial collateral excess details column configs
   */
  get initialCollateralExcessDetailsColumnConfigs(): LayoutConfig<CollateralExcessDetailsItem>[] {
    return this._initialCollateralExcessDetailsColumnConfig.map(item => ({...item}));
  }

  /**
   * return collateral excess details columns according to layout config
   */
  get collateralExcessDetailsColumns$(): Observable<TableColumn<CollateralExcessDetailsItem>[]> {
    return this._collateralExcessDetailsColumnConfig$.asObservable()
      .pipe(map(res => this._getOrderedCollateralExcessDetailsColumns(res)));
  }

  /**
   * return collateral excess details column configs
   */
  get collateralExcessDetailsColumnConfig$(): Observable<LayoutConfig<CollateralExcessDetailsItem>[]> {
    return this._collateralExcessDetailsColumnConfig$.asObservable();
  }

  /**
   * save collateral excess details columns layout config
   * @param columns columns
   */
  set collateralExcessDetailsColumnConfig(columns: LayoutConfig<CollateralExcessDetailsItem>[]) {
    storeToStorage(this._collateralExcessDetailsColumnKey, columns);
    this._collateralExcessDetailsColumnConfig$.next(columns);
  }

  /**
   * get ordered collateral excess details columns
   * @param config column layout config
   */
  private _getOrderedCollateralExcessDetailsColumns(
    config: LayoutConfig<CollateralExcessDetailsItem>[]): TableColumn<CollateralExcessDetailsItem>[] {
    const visibleColumns = [...config].filter(item => item.show);
    const columnMap = {};

    this._collateralExcessDetailsColumns.forEach(item => columnMap[item.property] = item);

    return visibleColumns.map(item => columnMap[item.property]);
  }


  /**
   * ------------------------------------------
   * columns methods for Transfer Page
   * ------------------------------------------
   */
  /**
   * return initial transfer column configs
   */
  get initialTransferColumnConfigs(): LayoutConfig<TransferItem>[] {
    return this._initialTransferColumnConfig.map(item => ({...item}));
  }

  /**
   * return transfer columns according to layout config
   */
  get transferColumns$(): Observable<TableColumn<TransferItem>[]> {
    return this._transferColumnConfig$.asObservable()
      .pipe(map(res => this._getOrderedTransferColumns(res)));
  }

  /**
   * return transfer column configs
   */
  get transferColumnConfig$(): Observable<LayoutConfig<TransferItem>[]> {
    return this._transferColumnConfig$.asObservable();
  }

  /**
   * save transfer columns layout config
   * @param columns columns
   */
  set transferColumnConfig(columns: LayoutConfig<TransferItem>[]) {
    storeToStorage(this._transferColumnKey, columns);
    this._transferColumnConfig$.next(columns);
  }

  /**
   * get ordered transfer columns
   * @param config column layout config
   */
  private _getOrderedTransferColumns(config: LayoutConfig<TransferItem>[]): TableColumn<TransferItem>[] {
    const visibleColumns = [...config].filter(item => item.show);
    const transferColumnMap = {};

    this._transferColumns.forEach(item => transferColumnMap[item.property] = item);

    return visibleColumns.map(item => transferColumnMap[item.property]);
  }

  /**
   * ------------------------------------------
   * columns methods for Search Application Page
   * ------------------------------------------
   */
  /**
   * return initial application column configs
   */
  get initialApplicationColumnConfigs(): LayoutConfig<ApplicationItem>[] {
    return this._initialApplicationColumnConfig.map(item => ({...item}));
  }

  /**
   * return application columns according to layout config
   */
  get applicationColumns$(): Observable<TableColumn<ApplicationItem>[]> {
    return this._applicationColumnConfig$.asObservable()
      .pipe(map(res => this._getOrderedApplicationColumns(res)));
  }

  /**
   * return application column configs
   */
  get applicationColumnConfig$(): Observable<LayoutConfig<ApplicationItem>[]> {
    return this._applicationColumnConfig$.asObservable();
  }

  /**
   * save application columns layout config
   * @param columns columns
   */
  set applicationColumnConfig(columns: LayoutConfig<ApplicationItem>[]) {
    storeToStorage(this._applicationColumnKey, columns);
    this._applicationColumnConfig$.next(columns);
  }

  /**
   * get ordered application columns
   * @param config column layout config
   */
  private _getOrderedApplicationColumns(config: LayoutConfig<ApplicationItem>[]): TableColumn<ApplicationItem>[] {
    const visibleColumns = [...config].filter(item => item.show);
    const applicationColumnMap = {};

    this._applicationColumns.forEach(item => applicationColumnMap[item.property] = item);

    return visibleColumns.map(item => applicationColumnMap[item.property]);
  }

  /**
   * ------------------------------------------
   * columns methods for Assigned Task Page
   * ------------------------------------------
   */
  /**
   * return initial task column configs
   */
  get initialTaskColumnConfigs(): LayoutConfig<TaskItem>[] {
    return this._initialTaskColumnConfig.map(item => ({...item}));
  }

  /**
   * return task columns according to layout config
   */
  get taskColumns$(): Observable<TableColumn<TaskItem>[]> {
    return this._taskColumnConfig$.asObservable()
      .pipe(map(res => this._getOrderedTaskColumns(res)));
  }

  /**
   * return task column configs
   */
  get taskColumnConfig$(): Observable<LayoutConfig<TaskItem>[]> {
    return this._taskColumnConfig$.asObservable();
  }

  /**
   * save task columns layout config
   * @param columns columns
   */
  set taskColumnConfig(columns: LayoutConfig<TaskItem>[]) {
    storeToStorage(this._taskColumnKey, columns);
    this._taskColumnConfig$.next(columns);
  }

  /**
   * get ordered task columns
   * @param config column layout config
   */
  private _getOrderedTaskColumns(config: LayoutConfig<TaskItem>[]): TableColumn<TaskItem>[] {
    const visibleColumns = [...config].filter(item => item.show);
    const taskColumnMap = {};

    this._taskColumns.forEach(item => taskColumnMap[item.property] = item);

    return visibleColumns.map(item => taskColumnMap[item.property]);
  }

  /**
   * ------------------------------------------
   * columns methods for Member Application
   * ------------------------------------------
   */
  /**
   * return initial memberApplication column configs
   */
  get initialMemberApplicationColumnConfigs(): LayoutConfig<ApplicationItem>[] {
    return this._initialMemberApplicationColumnConfig.map(item => ({...item}));
  }

  /**
   * return memberApplication columns according to layout config
   */
  get memberApplicationColumns$(): Observable<TableColumn<ApplicationItem>[]> {
    return this._memberApplicationColumnConfig$.asObservable()
      .pipe(map(res => this._getOrderedMemberApplicationColumns(res)));
  }

  /**
   * return memberApplication column configs
   */
  get memberApplicationColumnConfig$(): Observable<LayoutConfig<ApplicationItem>[]> {
    return this._memberApplicationColumnConfig$.asObservable();
  }

  /**
   * save memberApplication columns layout config
   * @param columns columns
   */
  set memberApplicationColumnConfig(columns: LayoutConfig<ApplicationItem>[]) {
    storeToStorage(this._memberApplicationColumnKey, columns);
    this._memberApplicationColumnConfig$.next(columns);
  }

  /**
   * get ordered memberApplication columns
   * @param config column layout config
   */
  private _getOrderedMemberApplicationColumns(config: LayoutConfig<ApplicationItem>[]): TableColumn<ApplicationItem>[] {
    const visibleColumns = [...config].filter(item => item.show);
    const memberApplicationColumnMap = {};

    this._memberApplicationColumns.forEach(item => memberApplicationColumnMap[item.property] = item);

    return visibleColumns.map(item => memberApplicationColumnMap[item.property]);
  }

  /*
   * columns methods for Admin Request Page
   * ------------------------------------------
   */
  /**
   * return initial admin request column configs
   */
  get initialAdminRequestColumnConfigs(): LayoutConfig<AdminRequestItem>[] {
    return this._initialAdminRequestColumnConfig.map(item => ({...item}));
  }

  /**
   * return admin request columns according to layout config
   */
  get adminRequestColumns$(): Observable<TableColumn<AdminRequestItem>[]> {
    return this._adminRequestColumnConfig$.asObservable()
      .pipe(map(res => this._getOrderedAdminRequestColumns(res)));
  }

  /**
   * return admin request column configs
   */
  get adminRequestColumnConfig$(): Observable<LayoutConfig<AdminRequestItem>[]> {
    return this._adminRequestColumnConfig$.asObservable();
  }

  /**
   * save admin request columns layout config
   * @param columns columns
   */
  set adminRequestColumnConfig(columns: LayoutConfig<AdminRequestItem>[]) {
    storeToStorage(this._adminRequestColumnKey, columns);
    this._adminRequestColumnConfig$.next(columns);
  }

  /**
   * get ordered admin request columns
   * @param config column layout config
   */
  private _getOrderedAdminRequestColumns(config: LayoutConfig<AdminRequestItem>[]): TableColumn<AdminRequestItem>[] {
    const visibleColumns = [...config].filter(item => item.show);
    const adminRequestColumnMap = {};

    this._adminRequestColumns.forEach(item => adminRequestColumnMap[item.property] = item);

    return visibleColumns.map(item => adminRequestColumnMap[item.property]);
  }

  /*
   * columns methods for Split Application Page
   * ------------------------------------------
   */
  /**
   * return initial split application column configs
   */
  get initialSplitApplicationColumnConfigs(): LayoutConfig<TaskItem>[] {
    return this._initialSplitApplicationColumnConfig.map(item => ({...item}));
  }

  /**
   * return split application columns according to layout config
   */
  get splitApplicationColumns$(): Observable<TableColumn<TaskItem>[]> {
    return this._splitApplicationColumnConfig$.asObservable()
      .pipe(map(res => this._getOrderedSplitApplicationColumns(res)));
  }

  /**
   * return split application column configs
   */
  get splitApplicationColumnConfig$(): Observable<LayoutConfig<TaskItem>[]> {
    return this._splitApplicationColumnConfig$.asObservable();
  }

  /**
   * save split application columns layout config
   * @param columns columns
   */
  set splitApplicationColumnConfig(columns: LayoutConfig<TaskItem>[]) {
    storeToStorage(this._splitApplicationColumnKey, columns);
    this._splitApplicationColumnConfig$.next(columns);
  }

  /**
   * get ordered split application columns
   * @param config column layout config
   */
  private _getOrderedSplitApplicationColumns(config: LayoutConfig<TaskItem>[]): TableColumn<TaskItem>[] {
    const visibleColumns = [...config].filter(item => item.show);
    const splitApplicationColumnMap = {};

    this._splitApplicationColumns.forEach(item => splitApplicationColumnMap[item.property] = item);

    return visibleColumns.map(item => splitApplicationColumnMap[item.property]);
  }


  /*
   * columns methods for Trade Table
   * ------------------------------------------
   */
  /**
   * return initial trade column configs
   */
  get initialTradeColumnConfigs(): LayoutConfig<TradeItem>[] {
    return this._initialTradeColumnConfig.map(item => ({...item}));
  }

  /**
   * return trade columns according to layout config
   */
  get tradeColumns$(): Observable<TableColumn<TradeItem>[]> {
    return this._tradeColumnConfig$.asObservable()
      .pipe(map(res => this._getOrderedTradeColumns(res)));
  }

  /**
   * return trade column configs
   */
  get tradeColumnConfig$(): Observable<LayoutConfig<TradeItem>[]> {
    return this._tradeColumnConfig$.asObservable();
  }

  /**
   * save trade columns layout config
   * @param columns columns
   */
  set tradeColumnConfig(columns: LayoutConfig<TradeItem>[]) {
    storeToStorage(this._tradeColumnKey, columns);
    this._tradeColumnConfig$.next(columns);
  }

  /**
   * get trade filters from stroage
   */
  get tradeColumnFilters(): FilterChangeEvent[] {
    return getFromStorage(this._tradeColumnFilersKey) || [];
  }

  /**
   * save trade columns filters
   * @param filters filters
   */
  set tradeColumnFilters(filters: FilterChangeEvent[]) {
    storeToStorage(this._tradeColumnFilersKey, filters);
  }

  /**
   * get ordered trade columns
   * @param config column layout config
   */
  private _getOrderedTradeColumns(config: LayoutConfig<TradeItem>[]): TableColumn<TradeItem>[] {
    const visibleColumns = [...config].filter(item => item.show);
    const tradeColumnMap = {};

    this._tradeColumns.forEach(item => tradeColumnMap[item.property] = item);

    return visibleColumns.map(item => tradeColumnMap[item.property]);
  }

  /**
   * ------------------------------------------
   * columns methods for Application Request Page
   * ------------------------------------------
   */
  /**
   * return initial application request column configs
   */
  get initialApplicationRequestColumnConfigs(): LayoutConfig<ApplicationRequestItem>[] {
    return this._initialApplicationRequestColumnConfig.map(item => ({...item}));
  }

  /**
   * return application request columns according to layout config
   */
  get applicationRequestColumns$(): Observable<TableColumn<ApplicationRequestItem>[]> {
    return this._applicationRequestColumnConfig$.asObservable()
      .pipe(map(res => this._getOrderedApplicationRequestColumns(res)));
  }

  /**
   * return application request column configs
   */
  get applicationRequestColumnConfig$(): Observable<LayoutConfig<ApplicationRequestItem>[]> {
    return this._applicationRequestColumnConfig$.asObservable();
  }

  /**
   * save application request columns layout config
   * @param columns columns
   */
  set applicationRequestColumnConfig(columns: LayoutConfig<ApplicationRequestItem>[]) {
    storeToStorage(this._applicationRequestColumnKey, columns);
    this._applicationRequestColumnConfig$.next(columns);
  }

  /**
   * get ordered application request columns
   * @param config column layout config
   */
  private _getOrderedApplicationRequestColumns(config: LayoutConfig<ApplicationRequestItem>[]): TableColumn<ApplicationRequestItem>[] {
    const visibleColumns = [...config].filter(item => item.show);
    const applicationRequestColumnMap = {};

    this._applicationRequestColumns.forEach(item => applicationRequestColumnMap[item.property] = item);

    return visibleColumns.map(item => applicationRequestColumnMap[item.property]);
  }

  /**
   * ------------------------------------------
   * columns methods for Oloc Assigned Task Page
   * ------------------------------------------
   */
  /**
   * return initial oloc task column configs
   */
  get initialOlocTaskColumnConfigs(): LayoutConfig<TaskItem>[] {
    return this._initialOlocTaskColumnConfig.map(item => ({...item}));
  }

  /**
   * return oloc task columns according to layout config
   */
  get olocTaskColumns$(): Observable<TableColumn<TaskItem>[]> {
    return this._olocTaskColumnConfig$.asObservable()
      .pipe(map(res => this._getOrderedOlocTaskColumns(res)));
  }

  /**
   * return oloc task column configs
   */
  get olocTaskColumnConfig$(): Observable<LayoutConfig<TaskItem>[]> {
    return this._olocTaskColumnConfig$.asObservable();
  }

  /**
   * save oloc task columns layout config
   * @param columns columns
   */
  set olocTaskColumnConfig(columns: LayoutConfig<TaskItem>[]) {
    storeToStorage(this._taskColumnKey, columns);
    this._olocTaskColumnConfig$.next(columns);
  }

  /**
   * get ordered oloc task columns
   * @param config column layout config
   */
  private _getOrderedOlocTaskColumns(config: LayoutConfig<TaskItem>[]): TableColumn<TaskItem>[] {
    const visibleColumns = [...config].filter(item => item.show);
    const olocTaskColumnMap = {};

    this._olocTaskColumns.forEach(item => olocTaskColumnMap[item.property] = item);

    return visibleColumns.map(item => olocTaskColumnMap[item.property]);
  }

  /**
   * ------------------------------------------
   * columns methods for Sim report Page
   * ------------------------------------------
   */
  /**
   * return initial sim report column configs
   */
  get initialSimReportColumnConfigs(): LayoutConfig<ApplicationItem>[] {
    return this._initialSimReportColumnConfig.map(item => ({...item}));
  }

  /**
   * return sim report columns according to layout config
   */
  get simReportColumns$(): Observable<TableColumn<ApplicationItem>[]> {
    return this._simReportColumnConfig$.asObservable()
      .pipe(map(res => this._getOrderedSimReportColumns(res)));
  }

  /**
   * return sim report column configs
   */
  get simReportColumnConfig$(): Observable<LayoutConfig<ApplicationItem>[]> {
    return this._simReportColumnConfig$.asObservable();
  }

  /**
   * save sim report columns layout config
   * @param columns columns
   */
  set simReportColumnConfig(columns: LayoutConfig<ApplicationItem>[]) {
    storeToStorage(this._taskColumnKey, columns);
    this._simReportColumnConfig$.next(columns);
  }

  /**
   * get ordered sim report columns
   * @param config column layout config
   */
  private _getOrderedSimReportColumns(config: LayoutConfig<ApplicationItem>[]): TableColumn<ApplicationItem>[] {
    const visibleColumns = [...config].filter(item => item.show);
    const simReportColumnMap = {};

    this._simReportColumns.forEach(item => simReportColumnMap[item.property] = item);

    return visibleColumns.map(item => simReportColumnMap[item.property]);
  }

  /*
   * columns methods for Olov Split Application Page
   * ------------------------------------------
   */
  /**
   * return initial split application column configs
   */
  get initialOlocSplitApplicationColumnConfigs(): LayoutConfig<ApplicationItem>[] {
    return this._initialOlocSplitApplicationColumnConfig.map(item => ({...item}));
  }

  /**
   * return split application columns according to layout config
   */
  get olocSplitApplicationColumns$(): Observable<TableColumn<ApplicationItem>[]> {
    return this._olocSplitApplicationColumnConfig$.asObservable()
      .pipe(map(res => this._getOrderedOlocSplitApplicationColumns(res)));
  }

  /**
   * return split application column configs
   */
  get olocSplitApplicationColumnConfig$(): Observable<LayoutConfig<ApplicationItem>[]> {
    return this._olocSplitApplicationColumnConfig$.asObservable();
  }

  /**
   * save split application columns layout config
   * @param columns columns
   */
  set olocSplitApplicationColumnConfig(columns: LayoutConfig<ApplicationItem>[]) {
    storeToStorage(this._olocSplitApplicationColumnKey, columns);
    this._olocSplitApplicationColumnConfig$.next(columns);
  }

  /**
   * get ordered split application columns
   * @param config column layout config
   */
  private _getOrderedOlocSplitApplicationColumns(config: LayoutConfig<ApplicationItem>[]): TableColumn<ApplicationItem>[] {
    const visibleColumns = [...config].filter(item => item.show);
    const olocSplitApplicationColumnMap = {};

    this._olocSplitApplicationColumns.forEach(item => olocSplitApplicationColumnMap[item.property] = item);

    return visibleColumns.map(item => olocSplitApplicationColumnMap[item.property]);
  }

  /**
   * initialize columns
   */
  private _initializeColumns(): void {
    this._requestColumnConfig$.next(getFromStorage(this._requestColumnKey) || this._initialRequestColumnConfig);
    this._transferColumnConfig$.next(getFromStorage(this._transferColumnKey) || this._initialTransferColumnConfig);
    this._applicationColumnConfig$.next(getFromStorage(this._applicationColumnKey) || this._initialApplicationColumnConfig);
    this._taskColumnConfig$.next(getFromStorage(this._taskColumnKey) || this._initialTaskColumnConfig);
    this._memberApplicationColumnConfig$
      .next(getFromStorage(this._memberApplicationColumnKey) || this._initialMemberApplicationColumnConfig);
    this._adminRequestColumnConfig$.next(getFromStorage(this._adminRequestColumnKey) || this._initialAdminRequestColumnConfig);
    this._splitApplicationColumnConfig$
      .next(getFromStorage(this._splitApplicationColumnKey) || this._initialSplitApplicationColumnConfig);
    this._applicationRequestColumnConfig$.next(getFromStorage(this._applicationRequestColumnKey)
      || this._initialApplicationRequestColumnConfig);
    this._olocTaskColumnConfig$.next(getFromStorage(this._olocTaskColumnKey) || this._initialOlocTaskColumnConfig);
    this._simReportColumnConfig$.next(getFromStorage(this._simReportColumnKey) || this._initialSimReportColumnConfig);
    this._olocSplitApplicationColumnConfig$.next(getFromStorage(this._olocSplitApplicationColumnKey)
      || this._initialOlocSplitApplicationColumnConfig);
    this._tradeColumnConfig$.next(getFromStorage(this._tradeColumnKey) || this._initialTradeColumnConfig);
  }


}
