type BookedCoworkingCardProps = {
  id: string;
  avatar?: string;
  title: string;
  description: string;
  address: string;

  images: CoworkingImageDto[];
  seats: SeatDto[];
  technicalCapabilities: TechnicalCapabilityDto[];
  workingSchedules: ScheduleDto[];
  events: EventDto[];
};

export default function BookedCoworkingCard({ }: BookedCoworkingCardProps): JSX.Element {
  return (
    <li className="user-acc__booked-item booking__info">
      <div className="booking__left-info">
        <div className="booking__info-carousel info-carousel">
          <img className="info-carousel__image" src="img/antresoli_1.jpg" alt="Коворкинг 'Антресоли'" />
        </div>
        <h3 className="booking__info-header title-reset">Антресоли</h3>
      </div>
      <div className="booking__right-info">
        <div className="booking__info-group">
          <h3 className="booking__info-title title-reset">Описание:</h3>
          <p className="booking__info-text paragraph-reset">
            &quot;Антресоли&quot; - это комфортное, уютное пространство для
            студентов, где любой желающий может провести время за работой или учебой. Студенты, приходящие в
            коворкинг, могут подготовиться к занятиям и обсудить свои проекты.
          </p>
        </div>
        <div className="booking__info-group">
          <h3 className="booking__info-title title-reset">Дата бронирования:</h3>
          <span className="booking__info-inline-text">21.04.2024</span>
        </div>
        <div className="booking__info-group">
          <h3 className="booking__info-title title-reset">Время бронирования:</h3>
          <span className="booking__info-inline-text">10:00 - 11:00</span>
        </div>
        <div className="booking__info-group">
          <h3 className="booking__info-title title-reset">Тип места:</h3>
          <span className="booking__info-inline-text">Переговорная</span>
        </div>
        <button className="booking__info-cancel-btn cb-light-btn btn-reset">Отменить</button>
      </div>
    </li>
  );
}
