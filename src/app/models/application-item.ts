export interface ApplicationItem {
  id: string;
  memberCode: string;
  memberName: string;
  requestType: string;
  entityType?: string;
  official: string;
  maker: string;
  status: string;
  applicationReceivedOn: string | Date;
  applicationStartedOn: string | Date;
  applicationSubmittedOn: string | Date;
  // selected state for UI
  selected?: boolean;
}
