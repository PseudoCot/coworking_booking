export type LoaderProps = {
  classes?: string;
  verticalAlignCenter?: boolean;
  horizontalAlignCenter?: boolean;
};

export default function Loader({ classes = '', verticalAlignCenter = false, horizontalAlignCenter = false }: LoaderProps): JSX.Element {
  return (
    <span className={`${classes} ${verticalAlignCenter ? 'loader-vertical-center' : ''}
      ${horizontalAlignCenter ? 'loader-horizontal-center' : ''} loader`}
    />
  );
}
