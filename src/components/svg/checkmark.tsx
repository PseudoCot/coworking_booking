type CheckmarkSVGProps = {
  classNames?: string;
};

export default function CheckmarkSVG({ classNames }: CheckmarkSVGProps): JSX.Element {
  return (
    <svg className={classNames} width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.03751 7.9864L1.34951 4.49239L0 6.04204L5.23322 11L13 1.34567L11.4625 0L5.03751 7.9864Z" fill="#283593" />
    </svg>
  );
}
