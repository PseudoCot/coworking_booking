type WhiteCheckmarkProps = {
  classes?: string;
};

export default function WhiteCheckmark({ classes }: WhiteCheckmarkProps): JSX.Element {
  return (
    <svg className={classes} width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10 1.03888L9.0597 0L3.7006 5.92098L0.940298 2.87127L0 3.91016L3.7017 7.99996L4.64199 6.96107L4.6409 6.95986L10 1.03888Z" fill="white" />
    </svg>
  );
}
