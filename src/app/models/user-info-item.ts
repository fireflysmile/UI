export type UserInfoRole =
  | 'RO'
  | 'HO'
  | 'Member'
  | 'Tester'
  | 'Member Admin'
  | 'LCN Admin'
  | 'LCN Super Admin'
  | 'Oloc'
  | 'TM'
  | 'CM'
  | 'CM & TM';

export interface UserInfoItem {
  // user role
  role: UserInfoRole;
  // enabled state
  enabled?: boolean;
  // only for RO ( and DEMO purposes only!! Not needed in integration phase )
  checker?: boolean;
}
