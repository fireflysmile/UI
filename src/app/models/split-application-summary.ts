import {ApplicationSummary} from './application-summary';

export interface SplitApplicationSummary {
  keyApprovals: ApplicationSummary;
  mandatorySubmissions: ApplicationSummary;
  otherCompliances: ApplicationSummary;
}
