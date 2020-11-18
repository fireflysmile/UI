export interface FileUploadResponse {
  // total rows
  total: number;
  // error rows
  errors: number;
  // error reasons
  reasons: string[];
}
