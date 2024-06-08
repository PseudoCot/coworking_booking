import { Validator } from '../types/validator';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const validateFilesMaxSize: Validator<boolean> = (files: FileList, maxFileSize = MAX_FILE_SIZE) =>
  Array.from(files).every((file) => file.size <= maxFileSize);

export default validateFilesMaxSize;
