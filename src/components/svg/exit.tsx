type ExitSVGProps = {
  classNames?: string;
};

export default function ExitSVG({ classNames }: ExitSVGProps): JSX.Element {
  return (
    <svg className={classNames} width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 16L0.5 16L0.5 0L13.5 0V5L11.5 5V2H2.5V14L11.5 14V11H13.5V16Z" fill="#14191A" />
      <path d="M15.5 12L19.5 8L15.5 4L15.5 7L6.5 7L6.5 9L15.5 9V12Z" fill="#14191A" />
    </svg>
  );
}
