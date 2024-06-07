import { DragEvent, useState } from 'react';
import FileInput from './file-input';
import PictureSVG from './svg/picture';
import classNames from 'classnames';
import { validateFilesMaxSize } from '../shared/validate-files-max-size';

type DragAndDropFileInputProps = {
  areaClasses?: string;

  imagePreview?: boolean;
  maxFileSize?: number;

  files?: FileList;
  setFiles: (value: FileList) => void;
};

export default function DragAndDropFileInput({ areaClasses = '', imagePreview, maxFileSize, files, setFiles }: DragAndDropFileInputProps): JSX.Element {
  const [dragActive, setDragActive] = useState(false);

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
    if (validateFilesMaxSize(transferFiles, maxFileSize)) {
      setFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className={classNames(`${areaClasses} dnd-file-input-wrapper`, {
      'dnd-file-input-wrapper--drag-active': dragActive,
    })} onDragEnter={handleDrag}
    >
      <PictureSVG />
      <FileInput btnClasses={dragActive ? 'file-input-btn--drag-active' : ''} maxFileSize={maxFileSize}
        files={files} setFiles={setFiles}
      />
      {dragActive &&
        <div className="dnd-file-input-over" onDragEnter={handleDrag} onDragLeave={handleDrag}
          onDragOver={handleDrag} onDrop={handleDrop}
        />}
    </div>
  );
}
