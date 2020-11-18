import { DocumentItem } from './document-item';

export interface ExtensionRequest {
  personnel: { id: string; name: string; }[];
  document: DocumentItem;
  accepted?: boolean;
}
