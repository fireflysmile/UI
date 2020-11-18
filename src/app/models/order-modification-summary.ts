export interface OrderModificationSummary {
  successful: number;
  modificationUnderProcess: number;
  autoModificationUnderProcess: number;
  unsuccessful: number;
  cashMarkets: {
    pending: number;
    modified: number;
  };
  futureAndOptions: {
    pending: number;
    modified: number;
  };
  currencyDerivatives: {
    pending: number;
    modified: number;
  };
}
