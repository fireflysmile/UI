import {TableColumn} from '../../../models/table-column';
import {TradeItem} from '../../../models/trade-item';
import {LayoutConfig} from '../../../models/layout-config';

export const EDART_INITIAL_COLUMNS: TableColumn<TradeItem>[] = [
  new TableColumn<TradeItem>('TM', 'tmCode'),
  new TableColumn<TradeItem>('PC Code', 'pcCode'),
  new TableColumn<TradeItem>('Buy/Sell', 'buySell'),
  new TableColumn<TradeItem>('Security Type', 'securityType'),
  new TableColumn<TradeItem>('Symbol', 'symbol'),
  new TableColumn<TradeItem>('Trade Price', 'price', {
    filterType: 'quantity',
    displayType: 'quantity',
  }),
  new TableColumn<TradeItem>('Trade Qty', 'qty', {
    filterType: 'quantity',
    displayType: 'quantity',
  }),
  new TableColumn<TradeItem>('Trade Value', 'value', {
    filterType: 'quantity',
    displayType: 'quantity',
  }),
  new TableColumn<TradeItem>('Exchange', 'exchange'),
  new TableColumn<TradeItem>('Order Num', 'orderNumber'),
  new TableColumn<TradeItem>('Trade Num', 'tradeNumber'),
  new TableColumn<TradeItem>('Trade Time', 'time', { filterType: 'time' }),
  new TableColumn<TradeItem>('Status', 'status', { displayType: 'allocation-status' }),
];

export const EDART_INITIAL_LAYOUT_CONFIGS: LayoutConfig<TradeItem>[] = [
  {label: 'TM', property: 'tmCode', show: true},
  {label: 'PC Code', property: 'pcCode', show: true},
  {label: 'Buy/Sell', property: 'buySell', show: true},
  {label: 'Security Type', property: 'securityType', show: true},
  {label: 'Symbol', property: 'symbol', show: true},
  {label: 'Trade Price', property: 'price', show: true},
  {label: 'Trade Qty', property: 'qty', show: true},
  {label: 'Trade Value', property: 'value', show: true},
  {label: 'Exchange', property: 'exchange', show: true},
  {label: 'Order Num', property: 'orderNumber', show: true},
  {label: 'Trade Num', property: 'tradeNumber', show: true},
  {label: 'Trade Time', property: 'time', show: true},
  {label: 'Status', property: 'status', show: true},
];
