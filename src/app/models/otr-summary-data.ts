export interface OtrSummaryData {
  allocationUnderProcess: number;
  unsuccessful: number;
  rejected: number;
  successful: {
    modified: number;
    potentialFPIViolation: number;
  };
  institutional: {
    pending: number;
    modified: number;
  };
  nonInstitutional: {
    pending: number;
    modified: number;
  };
}
