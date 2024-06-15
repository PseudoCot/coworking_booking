import classNames from 'classnames';
import { PropsWithChildren, useEffect } from 'react';

type ModalWindowProps = PropsWithChildren<{
  show: boolean;
}>;

export default function ModalWindow({ show, children }: ModalWindowProps): JSX.Element {
  useEffect(() => {
    if (show) {
      document.body.className = 'stop-scroll';
    } else {
      document.body.className = '';
    }
  }, [show]);

  return (
    <div className={classNames('modal-window', { 'modal-window--show': show })}>
      {show &&
        children}
    </div>
  );
}
