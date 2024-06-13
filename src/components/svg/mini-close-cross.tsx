type MiniCloseCrossSVGProps = {
  classes?: string;
};

export default function MiniCloseCrossSVG({ classes }: MiniCloseCrossSVGProps): JSX.Element {
  return (
    <svg className={classes} width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.00011 3.27279L0.727316 0L4.79157e-05 0.727268L3.27284 4.00006L0 7.2729L0.727268 8.00017L4.00011 4.72733L7.27272 7.99994L7.99999 7.27268L4.72738 4.00006L7.99994 0.727495L7.27268 0.000227765L4.00011 3.27279Z" fill="black" fillOpacity="0.8" />
    </svg>
  );
}
