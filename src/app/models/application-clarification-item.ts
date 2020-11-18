import {AttachmentItem} from './attachment-item';

export interface ApplicationClarificationItem {
  // section
  section: string;
  // comment
  comment: string;
  // comment attachments
  commentAttachments: AttachmentItem[];
  // clarification received date
  receivedDate: Date | string;
  // last update date
  lastUpdatedDate: Date | string;
  // closed date
  closedDate: Date | string;
  // response
  response: string;
  // response attachment
  responseAttachment: AttachmentItem;
  // sent state
  sent: boolean;
  // copied state
  copied: boolean;
  // deletable state
  deletable: boolean;
  // completed state
  completed: boolean;
  // edited state
  // if the official edited, this will true
  edited: boolean;
  // checked state for ui
  checked?: boolean;
  // original data of copy
  origin?: ApplicationClarificationItem;
}
