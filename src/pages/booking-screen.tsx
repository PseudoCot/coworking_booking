import BookingForm from '../components/booking-form';
import Layout from '../components/layout';
import Toast from '../components/toast';

export default function BookingScreen(): JSX.Element {
  return (
    <Layout>
      <article className="booking">
        <h1 className="booking__title cb-title title-reset">Коворкинги</h1>

        <div className="booking__wrapper">
          <div className="booking__info">
            <div className="booking__left-info">
              <div className="booking__info-carousel info-carousel">
                <button className="info-carousel__left-btn btn-reset"></button>
                <img className="info-carousel__image" src="img/antresoli_1.jpg" alt="Коворкинг 'Антресоли'" />
                <button className="info-carousel__right-btn btn-reset"></button>
              </div>
              <h2 className="booking__info-header title-reset">Антресоли</h2>
              <div className="booking__info-opening">
                <span className="booking__opening-title">Режим работы</span>
                <span className="booking__opening-text">с&nbsp;10:00 до&nbsp;16:00,<br />по&nbsp;заявкам</span>
              </div>
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
                <h3 className="booking__info-title title-reset">Адрес:</h3>
                <address className="booking__info-text">ул. Мира 19, 4 этаж</address>
              </div>
              <div className="booking__info-group">
                <h3 className="booking__info-title title-reset">Количество мест:</h3>
                <span className="booking__info-text">Переговорные: 2</span>
                <span className="booking__info-text">Столы: 40</span>
              </div>
              <div className="booking__info-group">
                <h3 className="booking__info-title title-reset">Технические возможности:</h3>
                <ul className="booking__info-list list-reset">
                  <li className="booking__info-point">стационарная и мобильная мебель как для индивидуальной, так и для груповой работы</li>
                  <li className="booking__info-point">6 маркерных досок</li>
                  <li className="booking__info-point">Wi-Fi</li>
                </ul>
              </div>
            </div>
            <ul className="booking__image-list list-reset">
              <li className="booking__image-item">
                <img className="booking__image" src="img/antresoli_1.jpg" alt="Антресоли" />
              </li>
              <li className="booking__image-item">
                <img className="booking__image" src="img/antresoli_2.png" alt="Антресоли" />
              </li>
              <li className="booking__image-item">
                <img className="booking__image" src="img/antresoli_1.jpg" alt="Антресоли" />
              </li>
              <li className="booking__image-item">
                <img className="booking__image" src="img/antresoli_2.png" alt="Антресоли" />
              </li>
              <li className="booking__image-item">
                <img className="booking__image" src="img/antresoli_1.jpg" alt="Антресоли" />
              </li>
              <li className="booking__image-item">
                <img className="booking__image" src="img/antresoli_2.png" alt="Антресоли" />
              </li>
              <li className="booking__image-item">
                <img className="booking__image" src="img/antresoli_1.jpg" alt="Антресоли" />
              </li>
            </ul>
          </div>

          <BookingForm />
        </div>

        <Toast title='Ошибка оформления бронирования!'>
          Заполните имя пользователя в telegram, это необходимо, чтобы мы могли оповещать вас в случае непредвиденного
          закрытия коворкинга (из-за подготовки к мероприятию/аварийных ситуаций). И также это требуется для возможности
          подтвердить бронирование.
        </Toast>
        <Toast title='Спасибо, место в коворкинге забронировано!'>
          Сейчас вам необходимо написать нашему telegram-боту - @имя_бота.<br />
          За 2 часа до начала брони вам придет оповещение для подтверждения бронирования. Нажмите кнопку “Отклонить”,
          если у вас поменяются планы. Или используйте кнопку “Подтвердить”, если бронирование коворкинга будет актуально.<br />
          Если подтверждение не будет получено за 30 минут до начала брони, то она будет отменена.
        </Toast>
      </article>
    </Layout>
  );
}
