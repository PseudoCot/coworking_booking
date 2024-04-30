import { PropsWithChildren, useRef } from 'react';
import CloseCrossSVG from './svg/close-cross';

type ToastProps = PropsWithChildren<{
  title: string;
}>;

export default function Toast({ title, children }: ToastProps): JSX.Element {
  const toastRef = useRef<HTMLDivElement>(null);

  const handleCloseButtonClick = () => {
    toastRef.current?.remove();
  };

  return (
    <div className="booking__toast cb-toast" ref={toastRef}>
      <button className="booking__close-toast-btn cb-close-toast-btn btn-reset" onClick={handleCloseButtonClick}>
        <CloseCrossSVG />
      </button>
      <h2 className="booking__toast-title cb-toast-title title-reset">{title}</h2>
      <p className="booking__toast-text cb-toast-text paragraph-reset">
        {children}
      </p>
    </div>
  );
}
