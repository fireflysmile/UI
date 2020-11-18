import { ApplicationPersonnel } from './application-personnel';
import { ApplicationReviewQueueItem } from './application-review-queue-item';
import { OfficialInfoItem } from './official-info-item';
import { ApplicationPriorApproval } from './application-prior-approval';
import { ApplicationPostFactoApproval } from './application-post-facto-approval';
import { DocumentItem } from './document-item';
import { ExtensionRequest } from './extension-request';
import {ChangedPostFacto} from './changed-post-facto';


export interface ApplicationDetails {
  id: string;
  date: string | Date;
  memberCode: number;
  memberName: string;
  contactPersonName: string;
  contactPersonNumber: number;
  contactPersonEmail: string;
  complianceOfficerName: string;
  complianceOfficerNumber: number;
  reviewOpenedOn?: Date | string;

  checker?: OfficialInfoItem;
  maker?: OfficialInfoItem;
  makerAssignedOn?: Date | string;

  url: string;
  processingFeeTransactionNo: string;

  applicants: ApplicationPersonnel[];
  postFactos: ApplicationPersonnel[];
  existingDirectors: ApplicationPersonnel[];

  declarationQuestions: { id: string; question: string }[];

  backgroundChecks: {
    name: string;
    website: string;
    feature: 'Yes' | 'No';
    risk: 'low' | 'medium' | 'high';
    otherComments?: string;
  }[];

  reviewQueue: ApplicationReviewQueueItem[];
  completedReviews: ApplicationReviewQueueItem[];

  approvals?: {
    completed: boolean;
    prior: ApplicationPriorApproval;
    postFacto: ApplicationPostFactoApproval;
  };

  postImplementation?: {
    memberConfirmation?: boolean;
    mcaVerified?: boolean;
    extensionRequest?: ExtensionRequest;
    mcaFailureCount: number;
    dir12sSubmitted?: boolean;
    dir12s?: {
      personnel: { name: string; id: string }[];
      document?: DocumentItem;
    }[];
  };

  postFactoChanges?: ChangedPostFacto[];
  memberNotifiedOfPostFactoChanges?: boolean;

}
