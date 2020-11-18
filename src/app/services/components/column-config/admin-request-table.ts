import {TableColumn} from '../../../models/table-column';
import {AdminRequestItem} from '../../../models/admin-request-item';
import {LayoutConfig} from '../../../models/layout-config';

export const ADMIN_REQUEST_INITIAL_COLUMNS: TableColumn<AdminRequestItem>[] = [
  new TableColumn<AdminRequestItem>('App. ID', 'applicationId', {
    displayType: 'link',
    routerLink: (row: AdminRequestItem) => ['/'],
  }),
  new TableColumn<AdminRequestItem>('Member Code', 'memberCode'),
  new TableColumn<AdminRequestItem>('Member Name', 'memberName'),
  new TableColumn<AdminRequestItem>('Member Type', 'memberType'),
  new TableColumn<AdminRequestItem>('Request Type', 'requestType'),
  new TableColumn<AdminRequestItem>('Status', 'status'),
  new TableColumn<AdminRequestItem>('Application started on', 'applicationStartedOn', {
    displayType: 'date',
    filterType: 'none',
    dateFormat: 'dd/MM/yyyy hh:mm a',
  }),
  new TableColumn<AdminRequestItem>('Application submitted on', 'applicationSubmittedOn', {
    displayType: 'date',
    filterType: 'none',
    dateFormat: 'dd/MM/yyyy hh:mm a',
  }),
];

export const ADMIN_REQUEST_INITIAL_LAYOUT_CONFIGS: LayoutConfig<AdminRequestItem>[] = [
  {label: 'App. ID', property: 'applicationId', show: true},
  {label: 'Member Code', property: 'memberCode', show: true},
  {label: 'Member Name', property: 'memberName', show: true},
  {label: 'Member Type', property: 'memberType', show: true},
  {label: 'Request Type', property: 'requestType', show: true},
  {label: 'Status', property: 'status', show: true},
  {label: 'Application started on', property: 'applicationStartedOn', show: true},
  {label: 'Application submitted on', property: 'applicationSubmittedOn', show: true},
];
