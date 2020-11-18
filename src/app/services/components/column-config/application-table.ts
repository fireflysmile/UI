import {TableColumn} from '../../../models/table-column';
import {ApplicationItem} from '../../../models/application-item';
import {LayoutConfig} from '../../../models/layout-config';

export const APPLICATION_INITIAL_COLUMNS: TableColumn<ApplicationItem>[] = [
  new TableColumn<ApplicationItem>('App. ID', 'id', {
    displayType: 'link',
    routerLink: (row: ApplicationItem) => ['/'],
  }),
  new TableColumn<ApplicationItem>('Member Code', 'memberCode'),
  new TableColumn<ApplicationItem>('Member Name', 'memberName'),
  new TableColumn<ApplicationItem>('Request Type', 'requestType'),
  new TableColumn<ApplicationItem>('HO/RO', 'official'),
  new TableColumn<ApplicationItem>('Maker', 'maker'),
  new TableColumn<ApplicationItem>('Application received on', 'applicationReceivedOn', {
    displayType: 'date',
    filterType: 'none',
    dateFormat: 'dd/MM/yyyy hh:mm a',
  }),
];

export const APPLICATION_INITIAL_LAYOUT_CONFIGS: LayoutConfig<ApplicationItem>[] = [
  {label: 'App. ID', property: 'id', show: true},
  {label: 'Member Code', property: 'memberCode', show: true},
  {label: 'Member Name', property: 'memberName', show: true},
  {label: 'Request Type', property: 'requestType', show: true},
  {label: 'HO/RO', property: 'official', show: true},
  {label: 'Maker', property: 'maker', show: true},
  {label: 'Application received on', property: 'applicationReceivedOn', show: true},
];
