import { useState } from 'react';
import { PlaceTypeOptions } from '../consts';
import { useAppDispatch } from '../hooks';
import getDateAndTimestamp from '../shared/get-date-and-timestamp';
import getImageURL from '../shared/get-image-url';
import { deleteBookingAction } from '../store/api-actions';
import { BookedCoworkingDto } from '../types/booking/booked-coworking-dto';
import SubmitForm from './submit-form';

type BookedCoworkingCardProps = BookedCoworkingDto;

export default function BookedCoworkingCard({ id, seat, coworking, session_start: from, session_end: to, }
  : BookedCoworkingCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const imageURL = getImageURL(coworking.avatar);
  const [date, timestamp] = getDateAndTimestamp(from, to);

  const [showBookingCancelSubmit, setShowBookingCancelSubmit] = useState(false);

  const handleBookingCancelToggle = () => {
    setShowBookingCancelSubmit((prev) => !prev);
  };
  const createHandleBookingCancelSubmit = () => {
    setShowBookingCancelSubmit((prev) => !prev);
    dispatch(deleteBookingAction(id));
  };

  return (
    <>
      <li className="user-acc__booked-item booking__info">
        <div className="booking__left-info">
          <div className="booking__info-img">
            <img className="info-carousel__image" src={imageURL} alt={coworking.title} />
          </div>
          <h3 className="booking__info-header title-reset">{coworking.title}</h3>
        </div>
        <div className="booking__right-info">
          <div className="booking__info-group">
            <h3 className="booking__info-title title-reset">Описание:</h3>
            <p className="booking__info-text paragraph-reset">
              {coworking.description}
            </p>
          </div>
          <div className="booking__info-group">
            <h3 className="booking__info-title title-reset">Дата бронирования:</h3>
            <span className="booking__info-inline-text">{date}</span>
          </div>
          <div className="booking__info-group">
            <h3 className="booking__info-title title-reset">Время бронирования:</h3>
            <span className="booking__info-inline-text">{timestamp}</span>
          </div>
          <div className="booking__info-group">
            <h3 className="booking__info-title title-reset">Тип места:</h3>
            <span className="booking__info-inline-text">
              {PlaceTypeOptions.find((option) => option.value === seat.place_type)?.title}
            </span>
          </div>
          <button className="booking__info-cancel-btn light-btn btn-reset" onClick={handleBookingCancelToggle}>
            Отменить
          </button>
        </div>
      </li>

      {showBookingCancelSubmit &&
        <SubmitForm title={'Отмена бронирования'} question={'Вы уверены, что хотите отменить бронирование?'}
          dismissText={'Нет'} submitText={'Да'} onDismiss={handleBookingCancelToggle}
          onSubmit={createHandleBookingCancelSubmit}
        />}
    </>
  );
}
