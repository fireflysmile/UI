import {PriorApprovalItem} from './prior-approval-item';
import {PriorApprovalDocument} from './prior-approval-document';

export interface PriorApprovalDetail {
  // approval info
  approvals: PriorApprovalItem[];
  // documents
  documents: PriorApprovalDocument[];
}
