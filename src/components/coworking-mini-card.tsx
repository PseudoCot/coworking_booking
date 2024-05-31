import { generatePath, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../routes';
import { ScheduleDto } from '../types/api-shared/schedule-dto';
import getImageURL from '../shared/get-image-url';
import getRoundedTime from '../shared/get-rounded-time';

type CoworkingMiniCardProps = {
  id: string;
  avatar?: string;
  title: string;
  workingSchedule?: ScheduleDto;
};

export default function CoworkingMiniCard({ id, avatar, title, workingSchedule }: CoworkingMiniCardProps): JSX.Element {
  const navigate = useNavigate();

  const imageURL = getImageURL(avatar);
  const [openingTime, endingTime] = workingSchedule
    ? [getRoundedTime(workingSchedule.start_time), getRoundedTime(workingSchedule.end_time)]
    : ['08:00', '20:00'];

  const handleCardClick = () => navigate(generatePath(AppRoutes.Booking.FullPath, { id: id }));

  return (
    <li className="coworkings__list-item" onClick={handleCardClick}>
      <img className="coworkings__item-img" src={imageURL} alt={title} />
      <h3 className="coworkings__item-title title-reset">{title}</h3>
      <div className="coworkings__item-content">
        <span className="coworkings__item-content-title">Режим работы</span>
        <span className="coworkings__item-content-info">
          с&nbsp;{openingTime} до&nbsp;{endingTime}
          {/* {true &&
              <>
                , <br />по&nbsp;заявкам
              </>} */}
        </span>
      </div>
    </li>
  );
}
