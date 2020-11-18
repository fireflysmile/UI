export interface RequestItem {
  segment: string;
  collateral: string;
  instrumentType: string;
  instrumentId: number;
  custodian: string;
  pendingRelease: string;
  pendingTransfer: string;
  requestedQty: number;
  trnRequestDate: string | Date;
  requestDate: string | Date;
  valueDate: string | Date;
  requestType: string;
  natureOfRequest: string;
  requestId: number;
  processDate: string | Date;
  status: string;
  clientCode: string;
  tmCode: string;
  isin: string;
  availableQty: number;
  timeOfCompletion: string;
  // selected state for UI
  selected?: boolean;
}
