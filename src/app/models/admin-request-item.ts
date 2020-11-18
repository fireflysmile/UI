export interface AdminRequestItem {
  applicationId: string;
  memberCode: string;
  memberName: string;
  memberType: string;
  requestType: string;
  status: string;
  applicationStartedOn: string | Date;
  applicationSubmittedOn: string | Date;
}


export interface NewRequest {
  memberName: string;
  memberCode: string;
  memberType: string;
}
