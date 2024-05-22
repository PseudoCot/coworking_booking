type TipSVGProps = {
  classes?: string;
};

export default function TipSVG({ classes }: TipSVGProps): JSX.Element {
  return (
    <svg className={classes} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.42859 4.28572H4.87886C4.91097 3.65123 5.32122 3.09864 6.00002 3.09864C6.67882 3.09864 7.1143 3.5193 7.1143 4.11429C7.1143 4.65073 6.94751 4.87015 6.25716 5.31429C5.51864 5.78151 5.1333 6.25957 5.20287 7.18247L5.26287 7.7143H6.67716L6.6343 7.19401C6.6343 6.64027 6.91683 6.44415 7.62859 6.00001C8.38316 5.52125 8.74287 4.8938 8.74287 4.02858C8.74287 2.69614 7.70199 1.71429 6.17145 1.71429C4.52851 1.71429 3.42859 2.74287 3.42859 4.28572Z" fill="#283593" />
      <path d="M5.98129 10.4497C6.58066 10.4497 6.94992 10.0747 6.94992 9.46907C6.94992 8.85765 6.58066 8.48272 5.98129 8.48272C5.38191 8.48272 5.0073 8.85765 5.0073 9.46907C5.0073 10.0747 5.38191 10.4497 5.98129 10.4497Z" fill="#283593" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM11.2 6C11.2 8.87188 8.87188 11.2 6 11.2C3.12812 11.2 0.8 8.87188 0.8 6C0.8 3.12812 3.12812 0.8 6 0.8C8.87188 0.8 11.2 3.12812 11.2 6Z" fill="#283593" />
    </svg>
  );
}
