import classNames from 'classnames';

export type LoaderProps = {
  classes?: string;
  alignCenter?: boolean;
  verticalAlignCenter?: boolean;
  horizontalAlignCenter?: boolean;
};

export default function Loader({ classes = '', alignCenter = false, verticalAlignCenter = false,
  horizontalAlignCenter = false }: LoaderProps): JSX.Element {
  return (
    <span className={classNames(classes, 'loader', {
      'loader-vertical-center': verticalAlignCenter,
      'loader-horizontal-center': horizontalAlignCenter,
      'loader-center': alignCenter
    })}
    />
  );
}
