import { AttachmentItem } from './attachment-item';

export interface ApplicationPostFactoApproval {
  accepted: boolean;
  warningLetter?: AttachmentItem;
  rejectionReason?: string;
  warningCancellationReason?: string;
  comments: { text: string; date: string | Date; seen?: boolean; }[];
  checkerConfirmation?: boolean;
  status?: string;
}
