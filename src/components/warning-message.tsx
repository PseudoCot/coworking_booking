import { PropsWithChildren } from 'react';

type WarningMessageProps = PropsWithChildren<{
  title: string;
}>;

export default function WarningMessage({ title, children }: WarningMessageProps): JSX.Element {
  return (
    <div className="user-acc__toast">
      <h2 className="user-acc__toast-title title-reset">{title}</h2>
      <p className="user-acc__toast-text paragraph-reset">
        {children}
      </p>
    </div>
  );
}
