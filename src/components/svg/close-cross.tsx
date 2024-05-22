type CloseCrossSVGProps = {
  classes?: string;
};

export default function CloseCrossSVG({ classes }: CloseCrossSVGProps): JSX.Element {
  return (
    <svg className={classes} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.27848 8.82397L0 16.199L1.6653 17.8864L8.94379 10.5114L16.3347 18.0003L18 16.3129L10.6091 8.82397L17.6522 1.6874L15.9869 0L8.94379 7.13657L2.01306 0.113892L0.347758 1.80129L7.27848 8.82397Z" fill="#283593" fillOpacity="0.8" />
    </svg>
  );
}
