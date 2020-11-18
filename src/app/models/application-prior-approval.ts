import { AttachmentItem } from './attachment-item';

export interface ApplicationPriorApproval {
  accepted: boolean;
  comments: { text: string; date: string | Date; seen?: boolean; }[];
  approvalLetter: AttachmentItem;
  rejectionReason?: string;
  status?: string;
  date?: string | Date;
}
