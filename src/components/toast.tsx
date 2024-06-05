import { PropsWithChildren, useRef } from 'react';
import CloseCrossSVG from './svg/close-cross';

type ToastProps = PropsWithChildren<{
  toastClasses?: string;
  toastTitleClasses?: string;
  toastTextClasses?: string;

  modalWindow: boolean;
  title: string;
  text: string; // учитывать, что white-spase: pre-line
}>;

export default function Toast({ toastClasses = '', toastTitleClasses = '', toastTextClasses = '',
  modalWindow, title, text, children }: ToastProps): JSX.Element {
  const toastWrapperRef = useRef<HTMLDivElement>(null);

  const handleCloseClick = () => {
    toastWrapperRef.current?.remove();
  };

  return (
    <div className={modalWindow ? 'toast-wrapper' : ''} ref={toastWrapperRef}>
      <div className={`${toastClasses} toast`}>
        <button className="close-toast-btn btn-reset" onClick={handleCloseClick}>
          <CloseCrossSVG />
        </button>
        <h2 className={`${toastTitleClasses} toast-title title-reset`}>{title}</h2>
        <p className={`${toastTextClasses} toast-text paragraph-reset`}>
          {text}
        </p>
        {children}
      </div>
    </div>
  );
}
