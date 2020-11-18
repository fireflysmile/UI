export type NotificationType =
  'error'
  | 'success'
  | 'payment'
  | 'assigned'
  | 'under-review'
  | 'clarification-responded'
  | 'approval-responded'
  | 'approval-granted'
  | 'post-implementation-checked';

export interface NotificationItem {
  // notification title
  title: string;
  // notification content
  content: string;
  // type
  type: NotificationType;
  // link for pending / granted type
  link?: string;
}
