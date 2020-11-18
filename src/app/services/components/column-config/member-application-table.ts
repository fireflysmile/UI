import {TableColumn} from '../../../models/table-column';
import {ApplicationItem} from '../../../models/application-item';
import {LayoutConfig} from '../../../models/layout-config';

export const MEMBER_APPLICATION_INITIAL_COLUMNS: TableColumn<ApplicationItem>[] = [
  new TableColumn<ApplicationItem>('App. ID', 'id', {
    displayType: 'link',
  }),
  new TableColumn<ApplicationItem>('Request Type', 'requestType'),
  new TableColumn<ApplicationItem>('Status', 'status'),
  new TableColumn<ApplicationItem>('Application Started on', 'applicationStartedOn', {
    displayType: 'date',
    filterType: 'none',
    dateFormat: 'dd/MM/yyyy hh:mm a',
  }),
  new TableColumn<ApplicationItem>('Application Submitted on', 'applicationSubmittedOn', {
    displayType: 'date',
    filterType: 'none',
    dateFormat: 'dd/MM/yyyy hh:mm a',
  }),
];

export const MEMBER_APPLICATION_INITIAL_LAYOUT_CONFIGS: LayoutConfig<ApplicationItem>[] = [
  {label: 'App. ID', property: 'id', show: true},
  {label: 'Request Type', property: 'requestType', show: true},
  {label: 'Status', property: 'status', show: true},
  {label: 'Application Started on', property: 'applicationStartedOn', show: true},
  {label: 'Application Submitted on', property: 'applicationSubmittedOn', show: true},
];
