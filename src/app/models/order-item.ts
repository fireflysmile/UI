export interface OrderItem {
  tm: string;
  pcCode: string;
  settlementType: string;
  settlementNo: string;
  otrNo: string;
  buySell: string;
  symbol: string;
  series: string;
  exchange: string;
  securityType: string;
  tradePriceRange: string;
  tradeQtyRange: string;
  tradeValueRange: string;
  orderNo: string;
  tradeNo: string;
  rangeOfTradeTime: string;
  status: string;
  // for UI
  unselectable?: boolean;
}
