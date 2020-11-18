export interface UserAccessInfoItem {
  userId: string;
  memberId: string;
  enabled: boolean;
  MC: boolean;
  FO: boolean;
  CD: boolean;
  CO: boolean;
  SLB: boolean;
  segment: string;
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber: {
    code: string;
    number: string;
  };
  // for UI
  selected?: boolean;
  // email reset loading
  resetLoading?: boolean;
}
