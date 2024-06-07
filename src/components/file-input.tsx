import { useRef, ChangeEvent, MouseEventHandler } from 'react';
import { validateFilesMaxSize } from '../shared/validate-files-max-size';

type FileInputProps = {
  labelClasses?: string;
  btnClasses?: string;

  multiple?: boolean;
  maxFileSize?: number;

  files?: FileList;
  setFiles: (value: FileList) => void;
};


export default function FileInput({ labelClasses = '', btnClasses = '', multiple, maxFileSize,
  files, setFiles }: FileInputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);


  const handleButtonClick: MouseEventHandler = (e) => {
    e.preventDefault();
    inputRef.current?.click();
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const targetFiles = e.target.files;
    if (targetFiles && validateFilesMaxSize(targetFiles, maxFileSize)) {
      setFiles(targetFiles);
    }
  };

  return (
    <>
      <input className="file-input" ref={inputRef} name="file-upload" type="file" multiple={multiple} onChange={handleInputChange} />
      <label className={`${labelClasses} file-input-label`} htmlFor="file-upload">
        <button className={`${btnClasses} file-input-btn btn-reset`} onClick={handleButtonClick}>
          {files?.[0] ? files[0].name : 'Выберите файл'}
        </button>
      </label>
    </>
  );
}
