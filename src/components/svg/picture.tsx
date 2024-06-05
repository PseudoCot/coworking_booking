type PictureSVGProps = {
  classes?: string;
};

export default function PictureSVG({ classes }: PictureSVGProps): JSX.Element {
  return (
    <svg className={classes} width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M76 67.5556V8.44444C76 3.8 72.2 0 67.5556 0H8.44444C3.8 0 0 3.8 0 8.44444V67.5556C0 72.2 3.8 76 8.44444 76H67.5556C72.2 76 76 72.2 76 67.5556ZM23.2222 44.3333L33.7778 57.0422L48.5556 38L67.5556 63.3333H8.44444L23.2222 44.3333Z" fill="#14191A" fillOpacity="0.6" />
    </svg>
  );
}
