export interface DocumentItem {
  type: string;
  name: string;
  url: string;
  company?: string;
  sharedWith?: { name: string; id: string; }[];
}
