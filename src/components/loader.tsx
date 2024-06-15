import classNames from 'classnames';

export type LoaderProps = {
  classes?: string;
  small?: boolean;
  alignCenter?: boolean;
  verticalAlignCenter?: boolean;
  horizontalAlignCenter?: boolean;
};

export default function Loader({ classes = '', small = false, alignCenter = false, verticalAlignCenter = false,
  horizontalAlignCenter = false }: LoaderProps): JSX.Element {
  return (
    <span className={classNames(classes, 'loader', {
      'loader--vertical-center': verticalAlignCenter,
      'loader--horizontal-center': horizontalAlignCenter,
      'loader--center': alignCenter,
      'loader--small': small
    })}
    />
  );
}
