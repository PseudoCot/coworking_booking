import classNames from 'classnames';
import { PropsWithChildren, useEffect } from 'react';

type ModalWindowProps = PropsWithChildren<{
  show: boolean;
}>;

export default function ModalWindow({ show, children }: ModalWindowProps): JSX.Element {
  useEffect(() => {
    if (show) {
      document.body.style.overflowY = 'hidden';
      document.body.style.paddingRight = '15px';
    } else {
      document.body.style.overflowY = 'auto';
      document.body.style.paddingRight = '0';
    }
  }, [show]);

  return (
    <div className={classNames('modal-window', { 'modal-window--show': show })}>
      {show &&
        children}
    </div>
  );
}
