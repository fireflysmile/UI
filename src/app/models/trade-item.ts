export interface TradeItem {
  tmCode: string;
  tmName: string;
  pcCode: string;
  pcName: string;
  ecCode: string;
  ecName: string;
  buySell: string;
  securityType: string;
  symbol: string;
  price: number;
  qty: number;
  value: number;
  exchange: string;
  orderNumber: string;
  tradeNumber: string;
  time: string;
  status: string;
  segment: string;
  isOTR: boolean;
  marginable?: boolean; // only for OTRs (I think)
}
