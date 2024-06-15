import { generatePath, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../routes';
import getImageURL from '../shared/get-image-url';
import getRoundedTime from '../shared/get-rounded-time';
import { CoworkingShortDto } from '../types/coworking/coworking-short-dto';

type CoworkingMiniCardProps = CoworkingShortDto;

export default function CoworkingMiniCard({ id, avatar, title, working_schedule: workingSchedule }: CoworkingMiniCardProps): JSX.Element {
  const navigate = useNavigate();

  const imageURL = getImageURL(avatar);
  const [openingTime, endingTime] = workingSchedule
    ? [getRoundedTime(workingSchedule.start_time), getRoundedTime(workingSchedule.end_time)]
    : ['', ''];

  const handleCardClick = () => navigate(generatePath(AppRoutes.Booking.FullPath, { id: id }));

  return (
    <li className="coworkings__list-item" onClick={handleCardClick}>
      <img className="coworkings__item-img" src={imageURL} alt={title} />
      <h3 className="coworkings__item-title title-reset">{title}</h3>
      <div className="coworkings__item-content">
        <span className="coworkings__item-content-title">Режим работы</span>
        <span className="coworkings__item-content-info">
          {openingTime && endingTime
            ? `с ${openingTime} до ${endingTime}`
            : 'Не указано'}
        </span>
      </div>
    </li>
  );
}
