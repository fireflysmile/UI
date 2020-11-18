export interface OrderModificationStatus {
  confirmed: number;
  unconfirmed: {
    modified: number;
    manuallyModified: number;
    unmodified: number;
  };
  nonPcTrades: number;
}
