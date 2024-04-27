type SelectArrowSVGProps = {
  classNames?: string;
};

export default function SelectArrowSVG({ classNames }: SelectArrowSVGProps): JSX.Element {
  return (
    <svg className={classNames} width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 3.49691e-07L0.535898 4.5L7.4641 4.5L4 3.49691e-07Z" fill="white" />
    </svg>
  );
}
