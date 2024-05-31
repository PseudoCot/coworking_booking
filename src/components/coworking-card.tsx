import { COWORKING_DEFAULT_IMAGE, PlaceTypeOptions } from '../consts';
import getRoundedTime from '../shared/get-rounded-time';
import { ScheduleDto } from '../types/api-shared/schedule-dto';
import { SeatDto } from '../types/api-shared/seat-dto';
import { TechnicalCapabilityDto } from '../types/api-shared/technical-capability-dto';
import { CoworkingImageDto } from '../types/coworking/coworking-image-dto';
import ImageCarousel from './image-carousel';

type CoworkingCardProps = {
  avatar?: string;
  title: string;
  description: string;
  address: string;

  images: CoworkingImageDto[];
  seats: SeatDto[];
  technicalCapabilities: TechnicalCapabilityDto[];
  workingSchedule: ScheduleDto[];
};

export default function CoworkingCard({ avatar, title, description, address, seats,
  workingSchedule, images, technicalCapabilities }: CoworkingCardProps): JSX.Element {
  // let avatarURL = avatar && getImageURL(avatar);
  // avatarURL = avatarURL || process.env.NODE_ENV === 'development'
  //   ? 'img/coworking-default-image.png'
  //   : getImageURL(''); // добавить название дефолтной картинки

  const [openingTime, endingTime] = workingSchedule.length
    ? [getRoundedTime(workingSchedule[0].start_time), getRoundedTime(workingSchedule[0].end_time)]
    : ['00:00', '24:00'];

  return (
    <div className="booking__info">
      <div className="booking__left-info">
        <ImageCarousel wrapperClasses='booking__info-carousel info-carousel' leftButtonClasses='info-carousel__left-btn'
          rightButtonClasses='info-carousel__image' imageClasses='info-carousel__right-btn'
          imageAlt={title} mainImage={avatar ?? COWORKING_DEFAULT_IMAGE}
          images={images.map((imageData) => imageData.image_filename)}
        />
        <h2 className="booking__info-header title-reset">{title}</h2>
        <div className="booking__info-opening">
          <span className="booking__opening-title">Режим работы</span>
          <span className="booking__opening-text">
            с&nbsp;{openingTime} до&nbsp;{endingTime}
            {/* {true &&
              <>
                , <br />по&nbsp;заявкам
              </>} */}
          </span>
          {/* расширить инфу по каждому дню недели? */}
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
            {seats.map((seatData) => (
              <span className="booking__info-text" key={seatData.place_type}>
                {PlaceTypeOptions.find((option) => option.value === seatData.place_type)?.value}: {seatData.seats_count}
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
