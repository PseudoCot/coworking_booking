import { useRef } from 'react';
import MiniMenu from './mini-menu';
import getFileLocalURL from '../shared/get-file-local-url';

type FileControllerProps = {
  controllerClasses?: string;

  orderNumber: number;
  files: File[];
  setFiles: (value?: File[]) => void;

  onDownload?: () => void;
  onDelete?: () => void;

  // fileError?: boolean; // drag and drop support
  // fileErrorText?: string; // drag and drop support
};

export default function FileController({ controllerClasses = '', orderNumber, files, setFiles,
  onDownload: handleDownload, onDelete: handleDelete }: FileControllerProps): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);

  const file = files[orderNumber];

  const handleDownloadClick = () => {
    handleDownload?.();
  };
  const handleDeleteClick = () => {
    if (files) {
      const newFiles = [...files];
      newFiles.splice(orderNumber, 1);
      setFiles(newFiles);
      handleDelete?.();
    }
  };

  return (
    <div className={`${controllerClasses} file-controller`} ref={rootRef}>
      {file.name}
      <MiniMenu menuBtnClasses='file-controller-menu-btn' menuClasses='file-controller-menu' rootRef={rootRef}>
        <a className="file-controller-in-menu-btn btn-reset" href={getFileLocalURL(file)}
          download={file.name} onClick={handleDownloadClick}
        >
          Скачать
        </a>
        <button className="file-controller-in-menu-btn btn-reset" onClick={handleDeleteClick}>Удалить</button>
      </MiniMenu>
    </div>
  );
}
