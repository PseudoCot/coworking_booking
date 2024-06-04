type PenSVGProps = {
  classes?: string;
};

export default function PenSVG({ classes }: PenSVGProps): JSX.Element {
  return (
    <svg className={classes} width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.02859 2.57141L7.64645 1.95355C7.84171 1.75829 7.84171 1.44171 7.64645 1.24645L6.75355 0.353554C6.55829 0.158291 6.24171 0.158291 6.04645 0.353553L5.42859 0.971407L7.02859 2.57141Z" fill="black" fillOpacity="0.8" />
      <path d="M6.57141 3.02859L4.97141 1.42859L0 6.4V8H1.6L6.57141 3.02859Z" fill="black" fillOpacity="0.8" />
    </svg>
  );
}
