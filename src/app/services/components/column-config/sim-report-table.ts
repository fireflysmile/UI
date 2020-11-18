import {TableColumn} from '../../../models/table-column';
import {ApplicationItem} from '../../../models/application-item';
import {LayoutConfig} from '../../../models/layout-config';

export const SIM_REPORT_INITIAL_COLUMNS: TableColumn<ApplicationItem>[] = [
  new TableColumn<ApplicationItem>('Transaction ID', 'id', {
    displayType: 'link',
    filterType: 'none',
    routerLink: (row: ApplicationItem) => ['/'],
  }),
  new TableColumn<ApplicationItem>('Assigned (Date/Time)', 'memberCode', {
    filterType: 'none'
  }),
  new TableColumn<ApplicationItem>('Kcar No', 'requestType', {
    filterType: 'none'
  }),
  new TableColumn<ApplicationItem>('Member Name', 'memberName', {
    filterType: 'none'
  }),
  new TableColumn<ApplicationItem>('Closed (Date/Time)', 'maker', {
    filterType: 'none'
  }),
  new TableColumn<ApplicationItem>('TAT', 'applicationReceivedOn', {
    displayType: 'date',
    filterType: 'none',
    dateFormat: 'dd/MM/yyyy hh:mm a',
  }),
];

export const SIM_REPORT_INITIAL_LAYOUT_CONFIGS: LayoutConfig<ApplicationItem>[] = [
  {label: 'Transaction ID', property: 'id', show: true},
  {label: 'Assigned (Date/Time)', property: 'memberCode', show: true},
  {label: 'Kcar No', property: 'requestType', show: true},
  {label: 'Member Name', property: 'memberName', show: true},
  {label: 'Closed (Date/Time)', property: 'maker', show: true},
  {label: 'TAT', property: 'applicationReceivedOn', show: true},
];
