import {TableColumn} from '../../../models/table-column';
import {TransferItem} from '../../../models/transfer-item';
import {LayoutConfig} from '../../../models/layout-config';

export const TRANSFER_INITIAL_COLUMNS: TableColumn<TransferItem>[] = [
  new TableColumn<TransferItem>('Symbol', 'symbol'),
  new TableColumn<TransferItem>('ISIN', 'isin'),
  new TableColumn<TransferItem>('Series', 'series'),
  new TableColumn<TransferItem>('Custodian', 'custodian'),
  new TableColumn<TransferItem>('TM Code', 'tmCode'),
  new TableColumn<TransferItem>('Client Code', 'clientCode'),
  new TableColumn<TransferItem>('Available Qty', 'availableQty', {
    filterType: 'quantity',
    displayType: 'quantity',
  }),
  new TableColumn<TransferItem>('Pending for Release', 'pendingForRelease'),
  new TableColumn<TransferItem>('Pending for Transfer', 'pendingForTransfer'),
  new TableColumn<TransferItem>('Net available Qty', 'netAvailableQty', {
    filterType: 'quantity',
    displayType: 'quantity',
  }),
  new TableColumn<TransferItem>('Destination Segment', 'destinationSegment', {displayType: 'destination-segment'}),
];

export const TRANSFER_INITIAL_LAYOUT_CONFIGS: LayoutConfig<TransferItem>[] = [
  {label: 'Symbol', property: 'symbol', show: true},
  {label: 'ISIN', property: 'isin', show: true},
  {label: 'Series', property: 'series', show: true},
  {label: 'Custodian', property: 'custodian', show: true},
  {label: 'TM Code', property: 'tmCode', show: true},
  {label: 'Client Code', property: 'clientCode', show: true},
  {label: 'Available Qty', property: 'availableQty', show: true},
  {label: 'Pending for Release', property: 'pendingForRelease', show: true},
  {label: 'Pending for Transfer', property: 'pendingForTransfer', show: true},
  {label: 'Net available Qty', property: 'netAvailableQty', show: true},
  {label: 'Destination Segment', property: 'destinationSegment', show: true},
];
