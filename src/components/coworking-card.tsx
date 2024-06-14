import { PlaceTypeOptions } from '../consts';
import getRoundedTime from '../shared/get-rounded-time';
import ImageCarousel from './image-carousel';
import { CoworkingDto } from '../types/coworking/coworking-dto';

type CoworkingCardProps = CoworkingDto;

export default function CoworkingCard({ avatar, title, description, address, seats, working_schedules: workingSchedule,
  images, technical_capabilities: technicalCapabilities }: CoworkingCardProps): JSX.Element {
  // let avatarURL = avatar && getImageURL(avatar);
  // avatarURL = avatarURL || import.meta.env.DEV
  //   ? 'img/coworking-default-image.png'
  //   : getImageURL(''); // добавить название дефолтной картинки

  const [openingTime, endingTime] = workingSchedule.length
    ? [getRoundedTime(workingSchedule[0].start_time), getRoundedTime(workingSchedule[0].end_time)]
    : ['08:00', '20:00'];

  const seatsTotalInfo = seats.reduce((result, seatDto) => {
    result[seatDto.place_type] = (result[seatDto.place_type] ?? 0) + seatDto.seats_count;
    return result;
  }, {} as { [key: string]: number });

  return (
    <div className="booking__info">
      <div className="booking__left-info">
        <ImageCarousel wrapperClasses='booking__info-carousel'
          imageAlt={title} mainImage={avatar}
          images={images.map((imageData) => imageData.image_filename)}
        />
        <h2 className="booking__info-header title-reset">{title}</h2>
        <div className="booking__info-opening">
          <span className="booking__opening-title">Режим работы</span>
          <span className="booking__opening-text">
            с&nbsp;{openingTime} до&nbsp;{endingTime}
          </span>
        </div>
      </div>
      <div className="booking__right-info">
        <div className="booking__info-group">
          <h3 className="booking__info-title title-reset">Описание:</h3>
          <p className="booking__info-text paragraph-reset">
            {description}
          </p>
        </div>
        <div className="booking__info-group">
          <h3 className="booking__info-title title-reset">Адрес:</h3>
          <address className="booking__info-text">{address}</address>
        </div>
        {seats.length &&
          <div className="booking__info-group">
            <h3 className="booking__info-title title-reset">Количество мест:</h3>
            {Object.entries(seatsTotalInfo).map(([seatType, seatCount]) => (
              <span className="booking__info-text" key={seatType}>
                {PlaceTypeOptions.find((option) => option.value === seatType)?.title}: {seatCount}
              </span>
            ))}
          </div>}
        {technicalCapabilities.length &&
          <div className="booking__info-group">
            <h3 className="booking__info-title title-reset">Технические возможности:</h3>
            <ul className="booking__info-list list-reset">
              {technicalCapabilities.map((techCapabilityData) => (
                <li className="booking__info-point" key={techCapabilityData.capability}>{techCapabilityData.capability}</li>
              ))}
            </ul>
          </div>}
      </div>
      {/* <ul className="booking__image-list list-reset">
        {images.map((imageData) => (
          <li className="booking__image-item" key={imageData.image_filename}>
            <img className="booking__image" src={getImageURL(imageData.image_filename)} alt={imageData.image_filename} />
          </li>
        ))}
      </ul> */}
    </div>
  );
}
