type SelectArrowSVGProps = {
  classes?: string;
};

export default function SelectArrowSVG({ classes }: SelectArrowSVGProps): JSX.Element {
  return (
    <svg className={classes} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M5 6L-5.08357e-07 0.906164L0.889471 1.57206e-07L5 4.18767L9.11053 8.75914e-07L10 0.906165L5 6Z" fill="#14191A" />
    </svg>
  );
}
