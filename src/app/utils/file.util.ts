/**
 * file to data url
 * @param file file
 */
import { noneArrayToArray } from './object.util';

export function toDataUrl(
  file: File,
  getReader = (reader: FileReader) => {}
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.readyState === 2) {
        resolve(reader.result as string);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };
    getReader(reader);
  });
}

/**
 * check file size
 * return true when fileList total size is smaller than limit
 * @param files files
 * @param limit size limit
 */
export function checkFileTotalSize(
  files: FileList | File[],
  limit: number
): boolean {
  if (limit) {
    let size = 0;

    noneArrayToArray(files).forEach((item) => {
      size += item.size;
    });

    return size <= limit;
  } else {
    return true;
  }
}

/**
 * check file acceptance
 * return true when all files are acceptable
 * @param files files
 * @param accepts
 * accept string list
 * do not use wildcard characters
 */
export function checkFileAcceptable(
  files: FileList | File[],
  accepts: string[]
): boolean {
  if (accepts.length > 0) {
    return noneArrayToArray(files).every((file) => {
      return accepts.indexOf(file.type) !== -1;
    });
  } else {
    return true;
  }
}
