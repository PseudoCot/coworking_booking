import Layout from '../components/layout';
import CloseCrossSVG from '../components/svg/close-cross';
import Toast from '../components/toast';

type BookingScreenProps = {};

export default function BookingScreen({ }: BookingScreenProps): JSX.Element {
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

          <form className="booking__form cb-form" action="">
            <div className="booking__form-wrapper cb-form-wrapper">
              <div className="booking__form-top cb-form-top">
                <h2 className="booking__form-title cb-form-title title-reset">Форма бронирования</h2>
              </div>
              <div className="booking__form-bottom cb-form-bottom">
                <div className="booking__form-group cb-form-group">
                  <label className="booking__form-label cb-form-label" htmlFor="type">Тип места:</label>
                  <div className="booking__form-select-wrapper">
                    <select className="booking__form-select cb-form-input" name="type" id="booking-type">
                      <option className="booking__form-select-option" value="" selected disabled hidden></option>
                      <option className="booking__form-select-option" value="Столы">Столы</option>
                      <option className="booking__form-select-option" value="Переговорные">Переговорные</option>
                    </select>
                  </div>
                </div>
                <div className="booking__form-group cb-form-group">
                  <label className="booking__form-label cb-form-label" htmlFor="date">Дата:</label>
                  <input className="booking__form-input cb-form-input" type="date" name="date" id="booking-date" />
                </div>
                <div className="booking__form-group cb-form-group">
                  <label className="booking__form-label cb-form-label" htmlFor="time">Время:</label>
                  <span className="booking__form-sub-label cb-form-sub-label">Начало:</span>
                  <div className="booking__form-time-group  cb-form-input">
                    <select className="booking__form-time-select" name="start-time-hours" id="start-time-hours">
                      <option value="08" className="booking__form-select-option">08</option>
                      <option value="09" className="booking__form-select-option">09</option>
                      <option value="10" className="booking__form-select-option">10</option>
                      <option value="11" className="booking__form-select-option">11</option>
                      <option value="12" className="booking__form-select-option">12</option>
                      <option value="13" className="booking__form-select-option">13</option>
                      <option value="14" className="booking__form-select-option">14</option>
                      <option value="15" className="booking__form-select-option">15</option>
                      <option value="16" className="booking__form-select-option">16</option>
                      <option value="17" className="booking__form-select-option">17</option>
                      <option value="18" className="booking__form-select-option">18</option>
                      <option value="19" className="booking__form-select-option">19</option>
                      <option value="20" className="booking__form-select-option">20</option>
                    </select>
                    <span className="booking__form-time-separator">:</span>
                    <select className="booking__form-time-select" name="start-time-min" id="start-time-min">
                      <option value="00" className="booking__form-select-option">00</option>
                      <option value="05" className="booking__form-select-option">05</option>
                      <option value="10" className="booking__form-select-option">10</option>
                      <option value="15" className="booking__form-select-option">15</option>
                      <option value="20" className="booking__form-select-option">20</option>
                      <option value="25" className="booking__form-select-option">25</option>
                      <option value="30" className="booking__form-select-option">30</option>
                      <option value="35" className="booking__form-select-option">35</option>
                      <option value="40" className="booking__form-select-option">40</option>
                      <option value="45" className="booking__form-select-option">45</option>
                      <option value="50" className="booking__form-select-option">50</option>
                      <option value="55" className="booking__form-select-option">55</option>
                    </select>
                  </div>
                  <span className="booking__form-sub-label cb-form-sub-label">Конец:</span>
                  <div className="booking__form-time-group  cb-form-input">
                    <select className="booking__form-time-select" name="start-time-hours" id="start-time-hours">
                      <option value="08" className="booking__form-select-option">08</option>
                      <option value="09" className="booking__form-select-option">09</option>
                      <option value="10" className="booking__form-select-option">10</option>
                      <option value="11" className="booking__form-select-option">11</option>
                      <option value="12" className="booking__form-select-option">12</option>
                      <option value="13" className="booking__form-select-option">13</option>
                      <option value="14" className="booking__form-select-option">14</option>
                      <option value="15" className="booking__form-select-option">15</option>
                      <option value="16" className="booking__form-select-option">16</option>
                      <option value="17" className="booking__form-select-option">17</option>
                      <option value="18" className="booking__form-select-option">18</option>
                      <option value="19" className="booking__form-select-option">19</option>
                      <option value="20" className="booking__form-select-option">20</option>
                    </select>
                    <span className="booking__form-time-separator">:</span>
                    <select className="booking__form-time-select" name="start-time-min" id="start-time-min">
                      <option value="00" className="booking__form-select-option">00</option>
                      <option value="05" className="booking__form-select-option">05</option>
                      <option value="10" className="booking__form-select-option">10</option>
                      <option value="15" className="booking__form-select-option">15</option>
                      <option value="20" className="booking__form-select-option">20</option>
                      <option value="25" className="booking__form-select-option">25</option>
                      <option value="30" className="booking__form-select-option">30</option>
                      <option value="35" className="booking__form-select-option">35</option>
                      <option value="40" className="booking__form-select-option">40</option>
                      <option value="45" className="booking__form-select-option">45</option>
                      <option value="50" className="booking__form-select-option">50</option>
                      <option value="55" className="booking__form-select-option">55</option>
                    </select>
                  </div>
                </div>
                <button className="booking__form-submit-btn cb-form-btn btn-reset">Забронировать</button>
              </div>
            </div>
          </form>
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
