import { useState } from 'react';
import BookingForm from '../components/booking-form';
import Layout from '../components/layout';
import Toast from '../components/toast';
import CoworkingCard from '../components/coworking-card';

export default function BookingScreen(): JSX.Element {
  const calendarEventLink = ''; // useAppSelector(getCalendarEventLink);

  const [showBookingError, setShowBookingError] = useState(false);
  const [showBookingSucces, setShowBookingSucces] = useState(false);

  return (
    <Layout>
      <article className="booking">
        <h1 className="booking__title cb-title title-reset">Коворкинги</h1>

        <div className="booking__wrapper">
          <CoworkingCard />

          <BookingForm />
        </div>

        {showBookingError &&
          <Toast toastClasses='booking__toast' toastTitleClasses='booking__toast-title' toastTextClasses='booking__toast-text'
            modalWindow title='Ошибка оформления бронирования!'
            text={`Заполните имя пользователя в telegram, это необходимо, чтобы мы могли оповещать вас в случае
            непредвиденного закрытия коворкинга (из-за подготовки к мероприятию/аварийных ситуаций).
            И также это требуется для возможности подтвердить бронирование.`}
          />}
        {showBookingSucces &&
          <Toast toastClasses='booking__toast' toastTitleClasses='booking__toast-title' toastTextClasses='booking__toast-text'
            modalWindow title='Спасибо, место в коворкинге забронировано!'
            text={`Сейчас вам необходимо написать нашему telegram-боту - @имя_бота.
            За 2 часа до начала брони вам придет оповещение для подтверждения бронирования. Нажмите
            кнопку “Отклонить”, если у вас поменяются планы. Или используйте кнопку “Подтвердить”, если
            бронирование коворкинга будет актуально.
            Если подтверждение не будет получено за 30 минут до начала брони, то она будет отменена.`}
          >
            <span className="booking__toast-btn-desc">Чтобы добавить бронь в свой календарь, нажмите на кнопку</span>
            <a href={calendarEventLink} className="booking__toast-btn">Google Calendar</a>
          </Toast>}
      </article>
    </Layout>
  );
}
