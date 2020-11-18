import {AttachmentItem} from './attachment-item';

export interface NotIncomingResigningDirector {
  name: string;
  direction: string;
  date: Date | string;
}

export interface AvailableDirector {
  name: string;
  success: boolean;
  directors: string[];
  uploaded: AttachmentItem;
}

export interface PostImplementationDetail {
  // sample letter link
  sampleExtensionRequestLetter: string;
  // available directors
  availableDirectors: AvailableDirector[];
  // selected request directors
  selectedRequestDirectors: string[];
  // selected post implementation directors
  selectedPostImplementationDirectors: string[];
  // directors who are not incoming and resigning
  notIncomingResigningDirectors: NotIncomingResigningDirector[];
  // submitted
  submitted: boolean;
  // uploaded item
  uploaded: AttachmentItem;
  // verified state
  verified: boolean;
  // post facto changed state
  postFactoChanged: boolean;
  // extension accepted
  extensionAccepted: boolean;
  // dir submitted
  dir12sSubmitted: boolean;
}
