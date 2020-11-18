import { ExperienceItem } from './experience-item';
import { DocumentItem } from './document-item';
import { DeclarationItem } from './declaration-item';

export interface ApplicationPersonnel {
  id: string;
  name: string;
  requestType: string;
  educationalQualification: string;
  age: number;
  pan: string;
  din: string;
  mobileNo: number;
  emailId: string;
  address: string;
  proposedDateOfChange: string | Date;
  actualDateOfChange?: string | Date;
  extensionDate?: string | Date;
  status?: string;
  postFacto: boolean;

  experiences: ExperienceItem[];
  documents: DocumentItem[];
  postFactoClarification?: string;
  declarations: DeclarationItem[];


}
