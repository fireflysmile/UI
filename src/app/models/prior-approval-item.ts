export type PriorApprovalStatus = 'granted' | 'rejected';

export type PriorApprovalType = 'prior-approval' | 'post-facto';

export interface PriorApprovalItem {
  // status
  status: PriorApprovalStatus;
  // type
  type: PriorApprovalType;
  // rejection reason
  rejectionReason: string;
}
