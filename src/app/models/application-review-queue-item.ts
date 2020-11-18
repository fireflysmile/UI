import { AttachmentItem } from './attachment-item';

export interface ApplicationReviewQueueItem {
  id?: string;
  isEdit?: boolean;
  sentToMember?: boolean;
  closed?: boolean;
  section: string;
  comment: {
    text: string;
    attachment?: AttachmentItem;
    date?: Date | string;
  };
  lastUpdatedDate?: string | Date;
  response?: {
    text: string;
    attachment: AttachmentItem;
    date?: Date | string;
  };

  sentToMaker?: boolean;
  // for ui state
  checked?: boolean;
  copied?: boolean;
  origin?: ApplicationReviewQueueItem;
  deletable?: boolean;

}
