type EditSVGProps = {
  classes: string;
};

export default function EditSVG({ classes }: EditSVGProps): JSX.Element {
  return (
    <svg className={classes} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.8964 5.70355L11.2786 6.32141L9.67859 4.72141L10.2964 4.10355C10.4917 3.90829 10.8083 3.90829 11.0036 4.10355L11.8964 4.99645C12.0917 5.19171 12.0917 5.50829 11.8964 5.70355Z" fill="#283593" fillOpacity="0.9" />
      <path d="M9.22141 5.17859L10.8214 6.77859L5.85 11.75H4.25V10.15L9.22141 5.17859Z" fill="#283593" fillOpacity="0.9" />
      <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8Z" fill="#283593" fillOpacity="0.9" />
    </svg>
  );
}
