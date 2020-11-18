import {TableColumn} from '../../../models/table-column';
import {TaskItem} from '../../../models/task-item';
import {LayoutConfig} from '../../../models/layout-config';

export const ASSIGNED_TASK_INITIAL_COLUMNS: TableColumn<TaskItem>[] = [
  new TableColumn<TaskItem>('App. ID', 'applicationId', {
    displayType: 'link',
    routerLink: (row: TaskItem) => ['/main/application-review'],
  }),
  new TableColumn<TaskItem>('Member Code', 'memberCode'),
  new TableColumn<TaskItem>('Member Name', 'memberName'),
  new TableColumn<TaskItem>('Request Type', 'requestType'),
  new TableColumn<TaskItem>('HO/RO', 'official'),
  new TableColumn<TaskItem>('Status', 'status'),
  new TableColumn<TaskItem>('Sub-Status', 'subStatus'),
  new TableColumn<TaskItem>('Maker', 'maker'),
  new TableColumn<TaskItem>('Application received on', 'applicationReceivedOn', {
    displayType: 'date',
    filterType: 'none',
    dateFormat: 'dd/MM/yyyy hh:mm a',
  }),
];

export const ASSIGNED_TASK_INITIAL_LAYOUT_CONFIGS: LayoutConfig<TaskItem>[] = [
  {label: 'App. ID', property: 'applicationId', show: true},
  {label: 'Member Code', property: 'memberCode', show: true},
  {label: 'Member Name', property: 'memberName', show: true},
  {label: 'Request Type', property: 'requestType', show: true},
  {label: 'HO/RO', property: 'official', show: true},
  {label: 'Status', property: 'status', show: true},
  {label: 'Sub-Status', property: 'subStatus', show: true},
  {label: 'Maker', property: 'maker', show: true},
  {label: 'Application received on', property: 'applicationReceivedOn', show: true},
];
