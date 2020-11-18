export interface MyTaskSummary {
  // the number of review pending status
  reviewPending: number;
  // the number of in-progress status
  inProgress: number;
  // the number of post checks status
  postChecks: number;
  // the number of final approvals
  finalApprovals: number;
  // final approval till date
  finalApprovalTillDate: string | Date;
}
