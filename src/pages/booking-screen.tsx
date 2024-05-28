import BookingForm from '../components/booking-form';
import Layout from '../components/layout';
import Toast from '../components/toast';
import CoworkingCard from '../components/coworking-card';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getCoworkingDto, isCoworkingFetching } from '../store/coworking-process/selectors';
import Loader from '../components/loader';
import { isBookingError, isBookingSucces } from '../store/booking-process/selectors';
import { useEffect } from 'react';
import { fetchCoworkingAction } from '../store/api-actions';
import { useParams } from 'react-router-dom';

export default function BookingScreen(): JSX.Element {
  const urlParams = useParams();
  const dispatch = useAppDispatch();
  const calendarEventLink = ''; // useAppSelector(getBookedEventLink);

  const coworkingDto = useAppSelector(getCoworkingDto);
  const coworkingFetching = useAppSelector(isCoworkingFetching);

  const showBookingSuccess = useAppSelector(isBookingSucces);
  const showBookingError = useAppSelector(isBookingError);

  useEffect(() => {
    if (urlParams.id) {
      dispatch(fetchCoworkingAction(urlParams.id));
    }
  }, [dispatch, urlParams.id]);

  return (
    <Layout>
      <article className="booking">
        <h1 className="booking__title cb-title title-reset">Коворкинги</h1>

        <div className="booking__wrapper">
          {coworkingDto
            ?
            <>
              <CoworkingCard title={coworkingDto.title} description={coworkingDto.description}
                address={coworkingDto.address} images={coworkingDto.images} seats={coworkingDto.seats}
                technicalCapabilities={coworkingDto.technical_capabilities} workingSchedules={coworkingDto.working_schedules}
              />
              <BookingForm />
            </>
            : coworkingFetching && <Loader />}
        </div>

        {showBookingSuccess &&
          <Toast toastClasses='booking__toast' toastTitleClasses='booking__toast-title' toastTextClasses='booking__toast-text'
            modalWindow title='Спасибо, место в коворкинге забронировано!'
            text={`Сейчас вам необходимо написать нашему telegram-боту - ${'@имя_бота'}.
            За 2 часа до начала брони вам придет оповещение для подтверждения бронирования. Нажмите
            кнопку “Отклонить”, если у вас поменяются планы. Или используйте кнопку “Подтвердить”, если
            бронирование коворкинга будет актуально.
            Если подтверждение не будет получено за 30 минут до начала брони, то она будет отменена.`}
          >
            <span className="booking__toast-btn-desc">Чтобы добавить бронь в свой календарь, нажмите на кнопку</span>
            <a href={calendarEventLink} className="booking__toast-btn cb-light-btn">Google Calendar</a>
          </Toast>}
        {showBookingError &&
          <Toast toastClasses='booking__toast' toastTitleClasses='booking__toast-title' toastTextClasses='booking__toast-text'
            modalWindow title='Ошибка оформления бронирования!'
            text={`Для оформления бронирования вам необходимо написать нашему telegram-боту - ${'@имя_бота'}.
            Создайте бронирование в системе повторно после старта чата с ним.
            Если у вас уже есть активный чат с нашим ботом, то обратитесь в техническую поддержку
            по адресу - ${'ПОЧТА'}.`}
          />}
      </article>
    </Layout>
  );
}
