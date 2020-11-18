export interface ApplicationRequestItem {
  id: string;
  memberCode: string;
  memberName: string;
  requestType: string;
  status: string;
  subStatus: string;
  applicationReceivedOn: string | Date;
  // selected state for UI
  selected?: boolean;
}
