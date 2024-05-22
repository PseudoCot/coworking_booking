type MapPointSVGProps = {
  classes?: string;
};

export default function MapPointSVG({ classes }: MapPointSVGProps): JSX.Element {
  return (
    <svg className={classes} width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7" stroke="#14191A" strokeWidth="2" />
      <path d="M1 9L7 17L13 9" stroke="#14191A" strokeWidth="2" />
      <circle cx="7" cy="7" r="2" stroke="#14191A" strokeWidth="2" />
    </svg>
  );
}
