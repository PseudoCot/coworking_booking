type CrossSVGProps = {
  classNames?: string;
};

export default function CrossSVG({ classNames }: CrossSVGProps): JSX.Element {
  return (
    <svg className={classNames} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.00003 3.88891L1.11112 0L9.19424e-06 1.11111L3.88892 5.00002L0 8.88895L1.11111 10.0001L5.00003 6.11113L8.88888 9.99998L9.99999 8.88887L6.11114 5.00002L9.99998 1.11118L8.88887 7.35539e-05L5.00003 3.88891Z" fill="#304FFE" fillOpacity="0.85" />
    </svg>
  );
}
