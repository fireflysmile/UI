import {YearValue} from '../components/year-selector/year-selector.component';

export interface SearchApplicationFilter {
  // year
  year: YearValue;
  // member code
  memberCode: string;
  // member name
  memberName: string;
  // request type
  requestType: string;
  // application id
  applicationId: string;
}
