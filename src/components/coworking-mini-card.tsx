type CoworkingMiniCardProps = {
  imgUrl: string;
  title: string;
  openingTime: string;
  closingTime: string;
  optionalText?: string;
};

export default function CoworkingMiniCard({ imgUrl, title, openingTime, closingTime, optionalText }: CoworkingMiniCardProps): JSX.Element {
  return (
    <li className="coworkings__list-item">
      <img className="coworkings__item-img" src={imgUrl} alt={`Коворкинг ${title}`} />
      <h3 className="coworkings__item-title title-reset">{title}</h3>
      <div className="coworkings__item-content">
        <span className="coworkings__item-content-title">Режим работы</span>
        <span className="coworkings__item-content-info">
          с&nbsp;{openingTime} до&nbsp;{closingTime}
          {optionalText ?? <>,<br /> {optionalText}</>}
        </span>
      </div>
    </li>
  );
}
