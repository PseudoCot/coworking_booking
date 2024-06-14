import classNames from 'classnames';
import { PropsWithChildren } from 'react';

type ModalWindowProps = PropsWithChildren<{
  show: boolean;
}>;

export default function ModalWindow({ show, children }: ModalWindowProps): JSX.Element {
  return (
    <div className={classNames('modal-window', { 'modal-window--show': show })}>
      {show &&
        children}
    </div>
  );
}
