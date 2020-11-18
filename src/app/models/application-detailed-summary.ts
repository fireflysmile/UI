export interface ApplicationDetailedSummary {
  applicationUnderReview: {
    reviewPending: number;
    inProgress: number;
  };
  applicationCompleted: {
    finalApprovals: number;
    postChecks: number;
  };
}
