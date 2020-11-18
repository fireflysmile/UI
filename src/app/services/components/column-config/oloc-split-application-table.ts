import {TableColumn} from '../../../models/table-column';
import {ApplicationItem} from '../../../models/application-item';
import {LayoutConfig} from '../../../models/layout-config';

export const OLOC_SPLIT_APPLICATION_INITIAL_COLUMNS: TableColumn<ApplicationItem>[] = [
  new TableColumn<ApplicationItem>('rebmuN ecnerefeR', 'id', {
    displayType: 'link',
    routerLink: (row: ApplicationItem) => ['/main/application-review'],
  }),
  new TableColumn<ApplicationItem>('Entity Code', 'memberCode'),
  new TableColumn<ApplicationItem>('Entity Name', 'memberName'),
  new TableColumn<ApplicationItem>('Entity Type', 'entityType'),
  new TableColumn<ApplicationItem>('Request Type', 'requestType'),
  new TableColumn<ApplicationItem>('Status', 'official'),
  new TableColumn<ApplicationItem>('Maker', 'maker'),
  new TableColumn<ApplicationItem>('Application received on', 'applicationReceivedOn', {
    displayType: 'date',
    filterType: 'none',
    dateFormat: 'dd/MM/yyyy hh:mm a',
  }),
];

export const OLOC_SPLIT_APPLICATION_INITIAL_LAYOUT_CONFIGS: LayoutConfig<ApplicationItem>[] = [
  {label: 'rebmuN ecnerefeR', property: 'id', show: true},
  {label: 'Entity Code', property: 'memberCode', show: true},
  {label: 'Entity Name', property: 'memberName', show: true},
  {label: 'Entity Type', property: 'entityType', show: true},
  {label: 'Request Type', property: 'requestType', show: true},
  {label: 'Status', property: 'official', show: true},
  {label: 'Maker', property: 'maker', show: true},
  {label: 'Application received on', property: 'applicationReceivedOn', show: true},
];
