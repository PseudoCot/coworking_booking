import { Validator } from '../types/validator';

export const validateFilesExtension: Validator<boolean> = (files: FileList, requiredFileExtensions: string[]) =>
  Array.from(files).every((file) => {
    const lastDotPos = file.name.lastIndexOf('.');
    if (lastDotPos < 0) {
      return false;
    }
    const fileExtension = file.name.substring(lastDotPos + 1);

    return requiredFileExtensions.includes(fileExtension);
  });

export default validateFilesExtension;
