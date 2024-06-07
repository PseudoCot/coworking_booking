import { Validator } from '../types/validator';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const validateFilesMaxSize: Validator<boolean> = (fileList?: FileList, maxFileSize = MAX_FILE_SIZE) => {
  if (!fileList) {
    return false;
  }

  return Array.from(fileList).every((file) => file.size <= maxFileSize);
};

export default validateFilesMaxSize;
