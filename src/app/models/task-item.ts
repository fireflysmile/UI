export interface TaskItem {
  // application id
  applicationId: string;
  // member code
  memberCode: string;
  // member name
  memberName: string;
  // request type
  requestType: string;
  // official (HO/RO)
  official: string;
  // status
  status: string;
  // sub status
  subStatus: string;
  // maker
  maker: string;
  // received on date
  applicationReceivedOn: string | Date;
  // kcar no.
  kcarNo?: string;
  // is kcar empty
  iskcarEmpty?: boolean;
}
