type RequiringStarSVGProps = {
  classes?: string;
};

export default function RequiringStarSVG({ classes }: RequiringStarSVGProps): JSX.Element {
  return (
    <svg className={classes} width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L8.99988 10" stroke="#B71C1C" />
      <path d="M1 10L9 1" stroke="#B71C1C" />
      <path d="M5 0L5 11" stroke="#B71C1C" />
      <line y1="5.5" x2="10" y2="5.5" stroke="#B71C1C" />
    </svg>
  );
}
