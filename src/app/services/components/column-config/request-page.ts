import {TableColumn} from '../../../models/table-column';
import {RequestItem} from '../../../models/request-item';
import {LayoutConfig} from '../../../models/layout-config';

export const REQUEST_INITIAL_COLUMNS: TableColumn<RequestItem>[] = [
  new TableColumn<RequestItem>('Request Date', 'requestDate', {filterType: 'date', displayType: 'date'}),
  new TableColumn<RequestItem>('Request ID', 'requestId'),
  new TableColumn<RequestItem>('Request Status', 'status', {displayType: 'request-status'}),
  new TableColumn<RequestItem>('TM Code', 'tmCode'),
  new TableColumn<RequestItem>('Client Code', 'clientCode'),
  new TableColumn<RequestItem>('Segment', 'segment'),
  new TableColumn<RequestItem>('Collateral Type', 'collateral', {displayType: 'titlecase'}),
  new TableColumn<RequestItem>('Instrument Type', 'instrumentType', {displayType: 'instrument-type'}),
  new TableColumn<RequestItem>('Instrument ID', 'instrumentId'),
  new TableColumn<RequestItem>('Nature of Request', 'natureOfRequest'),
  new TableColumn<RequestItem>('Request Type', 'requestType', {displayType: 'titlecase'}),
  new TableColumn<RequestItem>('Value Date', 'valueDate', {filterType: 'date', displayType: 'date'}),
  new TableColumn<RequestItem>('Time of Completion', 'timeOfCompletion', {filterType: 'time'}),
];

export const REQUEST_INITIAL_LAYOUT_CONFIGS: LayoutConfig<RequestItem>[] = [
  {label: 'Request Date', property: 'requestDate', show: true},
  {label: 'Request ID', property: 'requestId', show: true},
  {label: 'Request Status', property: 'status', show: true},
  {label: 'TM Code', property: 'tmCode', show: true},
  {label: 'Client Code', property: 'clientCode', show: true},
  {label: 'Segment', property: 'segment', show: true},
  {label: 'Collateral Type', property: 'collateral', show: true},
  {label: 'Instrument Type', property: 'instrumentType', show: true},
  {label: 'Instrument ID', property: 'instrumentId', show: true},
  {label: 'Nature of Request', property: 'natureOfRequest', show: true},
  {label: 'Request Type', property: 'requestType', show: true},
  {label: 'Value Date', property: 'valueDate', show: true},
  {label: 'Time of Completion', property: 'timeOfCompletion', show: true},
];
