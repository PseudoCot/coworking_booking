import BookingForm from '../components/booking-form';
import Layout from '../components/layout';
import Toast from '../components/toast';
import CoworkingCard from '../components/coworking-card';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getCoworkingDto, isCoworkingFetching } from '../store/coworking-process/selectors';
import Loader from '../components/loader';
import { getBookFetchingStatus } from '../store/booking-process/selectors';
import { useCallback, useEffect, useState } from 'react';
import { fetchCoworkingAction } from '../store/api-actions';
import { useParams } from 'react-router-dom';
import { FetchingStatuses, TECHNICAL_SUPPORT_EMAIL, TELEGRAM_BOT_NAME } from '../consts';
import { isUserTelegramConnected } from '../store/user-process/selectors';
import EventBanner from '../components/event-banner';

export default function BookingScreen(): JSX.Element {
  const urlParams = useParams();
  const dispatch = useAppDispatch();
  const isTelegramConnected = useAppSelector(isUserTelegramConnected);
  // const isAdmin = useAppSelector(isUserAdmin);

  const coworkingFetching = useAppSelector(isCoworkingFetching);
  const coworkingData = useAppSelector(getCoworkingDto);
  const bookFetchingStatus = useAppSelector(getBookFetchingStatus);
  const calendarEventLink = '#'; // useAppSelector(getBookedEventLink);

  const [showSuccesToast, setShowSuccesToast] = useState(false);
  const [showTgErrorToast, setShowTgErrorToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const handleSuccesToastClose = useCallback(() => setShowSuccesToast(false), []);
  const handleTgErrorToastClose = useCallback(() => setShowTgErrorToast(false), []);
  const handleErrorToastClose = useCallback(() => setShowErrorToast(false), []);

  useEffect(() => {
    if (urlParams.id && coworkingData?.id !== urlParams.id) {
      dispatch(fetchCoworkingAction(urlParams.id));
    }
  }, [coworkingData, dispatch, urlParams.id]);

  useEffect(() => {
    if (bookFetchingStatus === FetchingStatuses.Fulfilled) {
      setShowSuccesToast(true);
    } else if (bookFetchingStatus === FetchingStatuses.Rejected) {
      if (isTelegramConnected) {
        setShowTgErrorToast(true);
      } else {
        setShowErrorToast(true);
      }
    }
  }, [bookFetchingStatus, isTelegramConnected]);

  return (
    <Layout>
      <article className="booking">
        <h1 className="booking__title title title-reset">Коворкинги</h1>

        {coworkingData
          ?
          <>
            <EventBanner events={coworkingData.events} />
            <div className="booking__wrapper">
              <CoworkingCard {...coworkingData} />
              {/* {isAdmin || <BookingForm schedule={coworkingData.working_schedules?.[0]} />} */}
              <BookingForm schedule={coworkingData.working_schedules?.[0]} />
            </div>
          </>
          : coworkingFetching && <Loader horizontalAlignCenter />}

        <Toast toastClasses='booking__toast' toastTitleClasses='booking__toast-title' toastTextClasses='booking__toast-text'
          show={showSuccesToast} onCloseClick={handleSuccesToastClose}
          title='Спасибо, место в коворкинге забронировано!'
          text={`Сейчас вам необходимо написать нашему telegram-боту - ${TELEGRAM_BOT_NAME}.
          За 2 часа до начала брони вам придет оповещение для подтверждения бронирования. Нажмите
          кнопку “Отклонить”, если у вас поменяются планы. Или используйте кнопку “Подтвердить”, если
          бронирование коворкинга будет актуально.
          Если подтверждение не будет получено за 30 минут до начала брони, то она будет отменена.`}
        >
          <span className="booking__toast-btn-desc">Чтобы добавить бронь в свой календарь, нажмите на кнопку</span>
          <a href={calendarEventLink} className="booking__toast-btn light-btn">Google Calendar</a>
        </Toast>
        <Toast toastClasses='booking__toast' toastTitleClasses='booking__toast-title' toastTextClasses='booking__toast-text'
          show={showTgErrorToast} onCloseClick={handleTgErrorToastClose}
          title='Ошибка оформления бронирования!'
          text={`Для оформления бронирования вам необходимо написать нашему telegram-боту - ${TELEGRAM_BOT_NAME}.
          Создайте бронирование в системе повторно после старта чата с ним.
          Если у вас уже есть активный чат с нашим ботом, то обратитесь в техническую поддержку
          по адресу - ${TECHNICAL_SUPPORT_EMAIL}.`}
        />
        <Toast toastClasses='booking__toast' toastTitleClasses='booking__toast-title' toastTextClasses='booking__toast-text'
          show={showErrorToast} onCloseClick={handleErrorToastClose}
          title='Ошибка оформления бронирования!'
          text={`Указаны некорректные данные для бронирования коворкинга.
            Если у вас не получается избежать ошибки, то обратитесь в техническую поддержку
            по адресу - ${TECHNICAL_SUPPORT_EMAIL}.`}
        />
      </article>
    </Layout>
  );
}
