import { DragEvent, useState } from 'react';
import FileInput from './file-input';
import PictureSVG from './svg/picture';
import classNames from 'classnames';
import { ValidatorData } from '../types/validator-data';
import useValidator from '../hooks/use-validator';
import FileController from './file-controller';
import getFileLocalURL from '../shared/get-file-local-url';

type DragAndDropFileInputProps = {
  areaClasses?: string;

  imagePreview?: boolean;
  tooltipText?: string;
  validatorsData?: ValidatorData<boolean>[];

  files?: File[];
  setFiles: (value?: File[]) => void;
};

export default function DragAndDropFileInput({ areaClasses = '', imagePreview, tooltipText,
  validatorsData, files, setFiles }: DragAndDropFileInputProps): JSX.Element {
  const [dragActive, setDragActive] = useState(false);

  const [error, errorText, validateFiles] = useValidator(validatorsData);

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);
    const transferFiles = e.dataTransfer.files;
    if (transferFiles[0] && validateFiles(transferFiles)) {
      setFiles(Array.from(e.dataTransfer.files));
    } else {
      setFiles(undefined);
    }
  };

  return (
    <div className={classNames(`${areaClasses} dnd-file-input-wrapper`, {
      'dnd-file-input-wrapper--drag-active': dragActive,
      'dnd-file-input-wrapper--incorrect-file': error,
      'dnd-file-input-wrapper--preview': imagePreview && files?.[0],
    })} onDragEnter={handleDrag}
    >
      {imagePreview && files?.[0]
        ? <img className="dnd-file-input-preview" src={getFileLocalURL(files[0])} alt='Аватарка коворкинга' />
        : <PictureSVG />}

      {files?.[0]
        ? <FileController key={files[0].name} orderNumber={0} files={files} setFiles={setFiles} />
        :
        <FileInput btnClasses={dragActive ? 'file-input-btn--drag-active' : ''} tooltipText={tooltipText}
          validatorsData={validatorsData} orderNumber={0} files={files} setFiles={setFiles}
          dndError={error} dndErrorText={errorText}
        />}

      {dragActive &&
        <div className="dnd-file-input-over" onDragEnter={handleDrag} onDragLeave={handleDrag}
          onDragOver={handleDrag} onDrop={handleDrop}
        />}
    </div>
  );
}
