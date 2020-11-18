import { RequestItem } from 'src/app/models/request-item';
import { TableColumn } from 'src/app/models/table-column';
import { LayoutConfig } from 'src/app/models/layout-config';
import { ApplicationItem } from 'src/app/models/application-item';
import { TaskItem } from 'src/app/models/task-item';
import { AdminRequestItem } from 'src/app/models/admin-request-item';

export const mockTableColumns: TableColumn<RequestItem>[] = [
  new TableColumn<RequestItem>('Request Date', 'requestDate', {
    filterType: 'date',
    displayType: 'date',
  }),
  new TableColumn<RequestItem>('Request ID', 'requestId'),
  new TableColumn<RequestItem>('Request Status', 'status', {
    displayType: 'request-status',
  }),
  new TableColumn<RequestItem>('TM Code', 'tmCode'),
  new TableColumn<RequestItem>('Client Code', 'clientCode'),
  new TableColumn<RequestItem>('Segment', 'segment'),
  new TableColumn<RequestItem>('Collateral Type', 'collateral', {
    displayType: 'titlecase',
  }),
  new TableColumn<RequestItem>('Instrument Type', 'instrumentType', {
    displayType: 'instrument-type',
  }),
  new TableColumn<RequestItem>('Instrument ID', 'instrumentId'),
  new TableColumn<RequestItem>('Nature of Request', 'natureOfRequest'),
  new TableColumn<RequestItem>('Request Type', 'requestType', {
    displayType: 'titlecase',
  }),
  new TableColumn<RequestItem>('Value Date', 'valueDate', {
    filterType: 'date',
    displayType: 'date',
  }),
  new TableColumn<RequestItem>('Time of Completion', 'timeOfCompletion', {
    filterType: 'time',
  }),
];

export const mockApplicationColumns: TableColumn<ApplicationItem>[] = [
  new TableColumn<ApplicationItem>('App. ID', 'id', {
    displayType: 'link',
    routerLink: null,
  }),
  new TableColumn<ApplicationItem>('Member Code', 'memberCode'),
  new TableColumn<ApplicationItem>('Member Name', 'memberName'),
  new TableColumn<ApplicationItem>('Request Type', 'requestType'),
  new TableColumn<ApplicationItem>('HO/RO', 'official'),
  new TableColumn<ApplicationItem>('Maker', 'maker'),
  new TableColumn<ApplicationItem>(
    'Application received on',
    'applicationReceivedOn',
    {
      displayType: 'date',
      filterType: 'none',
      dateFormat: 'dd/MM/yyyy hh:mm a',
    }
  ),
];

export const mockTaskColumns: TableColumn<TaskItem>[] = [
  new TableColumn<TaskItem>('App. ID', 'applicationId', {
    displayType: 'link',
    routerLink: null,
  }),
  new TableColumn<TaskItem>('Member Code', 'memberCode'),
  new TableColumn<TaskItem>('Member Name', 'memberName'),
  new TableColumn<TaskItem>('Request Type', 'requestType'),
  new TableColumn<TaskItem>('HO/RO', 'official'),
  new TableColumn<TaskItem>('Status', 'status'),
  new TableColumn<TaskItem>('Sub-Status', 'subStatus'),
  new TableColumn<TaskItem>('Maker', 'maker'),
  new TableColumn<TaskItem>(
    'Application received on',
    'applicationReceivedOn',
    {
      displayType: 'date',
      filterType: 'none',
      dateFormat: 'dd/MM/yyyy hh:mm a',
    }
  ),
];

export const mockAdminRequestColumns: TableColumn<AdminRequestItem>[] = [
  new TableColumn<AdminRequestItem>('App. ID', 'applicationId', {
    displayType: 'link',
    routerLink: null,
  }),
  new TableColumn<AdminRequestItem>('Member Code', 'memberCode'),
  new TableColumn<AdminRequestItem>('Member Name', 'memberName'),
  new TableColumn<AdminRequestItem>('Member Type', 'memberType'),
  new TableColumn<AdminRequestItem>('Request Type', 'requestType'),
  new TableColumn<AdminRequestItem>('Status', 'status'),
  new TableColumn<AdminRequestItem>(
    'Application started on',
    'applicationStartedOn',
    {
      displayType: 'date',
      filterType: 'none',
      dateFormat: 'dd/MM/yyyy hh:mm a',
    }
  ),
  new TableColumn<AdminRequestItem>(
    'Application submitted on',
    'applicationSubmittedOn',
    {
      displayType: 'date',
      filterType: 'none',
      dateFormat: 'dd/MM/yyyy hh:mm a',
    }
  ),
];

export const mockLayoutConfig: LayoutConfig<RequestItem>[] = [
  { label: 'Request Date', property: 'requestDate', show: true },
  { label: 'Request ID', property: 'requestId', show: true },
  { label: 'Request Status', property: 'status', show: true },
  { label: 'TM Code', property: 'tmCode', show: true },
  { label: 'Client Code', property: 'clientCode', show: true },
  { label: 'Segment', property: 'segment', show: true },
  { label: 'Collateral Type', property: 'collateral', show: true },
  { label: 'Instrument Type', property: 'instrumentType', show: true },
  { label: 'Instrument ID', property: 'instrumentId', show: true },
  { label: 'Nature of Request', property: 'natureOfRequest', show: true },
  { label: 'Request Type', property: 'requestType', show: true },
  { label: 'Value Date', property: 'valueDate', show: true },
  { label: 'Time of Completion', property: 'timeOfCompletion', show: true },
];
