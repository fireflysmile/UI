export interface TransferItem {
  symbol: string;
  isin: string;
  series: string;
  custodian: string;
  tmCode: string;
  clientCode: string;
  availableQty: number;
  pendingForRelease: string;
  pendingForTransfer: string;
  netAvailableQty: number;
  destinationSegment: string;
  segment: string;
  collateral: string;
  instrumentType: string;
  // selected state for UI
  selected?: boolean;
}
