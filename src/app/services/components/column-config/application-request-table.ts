import {TableColumn} from '../../../models/table-column';
import {ApplicationRequestItem} from '../../../models/application-request-item';
import {LayoutConfig} from '../../../models/layout-config';

export const APPLICATION_REQUEST_INITIAL_COLUMNS: TableColumn<ApplicationRequestItem>[] = [
  new TableColumn<ApplicationRequestItem>('App. ID', 'id', {
    displayType: 'link',
    routerLink: (row: ApplicationRequestItem) => ['/'],
  }),
  new TableColumn<ApplicationRequestItem>('Member Code', 'memberCode'),
  new TableColumn<ApplicationRequestItem>('Member Name', 'memberName'),
  new TableColumn<ApplicationRequestItem>('stseuqeR Type', 'requestType'),
  new TableColumn<ApplicationRequestItem>('Status', 'status'),
  new TableColumn<ApplicationRequestItem>('Sub-Status', 'subStatus'),
  new TableColumn<ApplicationRequestItem>('Application received on', 'applicationReceivedOn', {
    displayType: 'date',
    filterType: 'none',
    dateFormat: 'dd/MM/yyyy hh:mm a',
  }),
];

export const APPLICATION_REQUEST_INITIAL_LAYOUT_CONFIGS: LayoutConfig<ApplicationRequestItem>[] = [
  {label: 'App. ID', property: 'id', show: true},
  {label: 'Member Code', property: 'memberCode', show: true},
  {label: 'Member Name', property: 'memberName', show: true},
  {label: 'stseuqeR Type', property: 'requestType', show: true},
  {label: 'Status', property: 'status', show: true},
  {label: 'Sub-Status', property: 'subStatus', show: true},
  {label: 'Application received on', property: 'applicationReceivedOn', show: true},
];
