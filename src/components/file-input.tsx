import { useRef, ChangeEvent, MouseEventHandler } from 'react';
import { ValidatorData } from '../types/validator-data';
import useValidator from '../hooks/use-validator';
import TipSVG from './svg/tip';
import RedWarningSVG from './svg/red-warning';

type FileInputProps = {
  labelClasses?: string;
  btnClasses?: string;
  tooltipClasses?: string;

  tooltipText?: string;
  validatorsData?: ValidatorData<boolean>[];

  orderNumber: number; // multiple input list support
  files?: File[];
  setFiles: (value?: File[]) => void;
  dndError?: boolean; // drag and drop support
  dndErrorText?: string; // drag and drop support
};

export default function FileInput({ labelClasses = '', btnClasses = '', tooltipClasses = '', tooltipText, validatorsData,
  orderNumber, files, setFiles, dndError, dndErrorText }: FileInputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const [error, errorText, validateFiles] = useValidator(validatorsData);

  const handleButtonClick: MouseEventHandler = (e) => {
    e.preventDefault();
    inputRef.current?.click();
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const inputFiles = e.target.files;

    if (inputFiles?.[0] && validateFiles(inputFiles)) {
      if (files) {
        const newFiles = [...files];
        newFiles[orderNumber] = inputFiles[0];
        setFiles(newFiles);
      } else {
        setFiles(Array.from(inputFiles));
      }
    } else if (orderNumber === 0) {
      setFiles(undefined);
    }
  };

  return (
    <>
      <input className="file-input" ref={inputRef} name="file-upload" type="file" onChange={handleInputChange} />
      <label className={`${labelClasses} file-input-label`} htmlFor="file-upload">
        <button className={`${btnClasses} file-input-btn btn-reset`} onClick={handleButtonClick}>
          {files?.[orderNumber] ? files[orderNumber].name : 'Выберите файл'}
        </button>
        {(error || dndError) &&
          <span className='file-input-error' data-error={errorText || dndErrorText}>
            <RedWarningSVG />
          </span>}
        {tooltipText &&
          <span className={`${tooltipClasses} file-input-tooltip`} data-tip={tooltipText}>
            <TipSVG />
          </span>}
      </label>
    </>
  );
}
