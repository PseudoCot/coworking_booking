type SearchSVGProps = {
  classNames?: string;
};

export default function SearchSVG({ classNames }: SearchSVGProps): JSX.Element {
  return (
    <svg className={classNames} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 15L19 19" stroke="#14191A" strokeWidth="2" />
      <circle cx="8" cy="8" r="7" stroke="#14191A" strokeWidth="2" />
    </svg>
  );
}
