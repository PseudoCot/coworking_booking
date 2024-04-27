import Layout from '../components/layout';
import CheckmarkSVG from '../components/svg/checkmark';
import CloseCrossSVG from '../components/svg/close-cross';
import WarningMessage from '../components/warning-message';

type UserAccScreenProps = {};

export default function UserAccScreen({ }: UserAccScreenProps): JSX.Element {
  return (
    <Layout>
      <article className="user-acc">
        <h1 className="user-acc__title cb-title title-reset">Личный кабинет</h1>

        <WarningMessage title='Предупреждение!' >
          Заполните имя пользователя в telegram, это необходимо, чтобы мы могли оповещать вас в случае непредвиденного
          закрытия коворкинга (из-за подготовки к мероприятию/аварийных ситуаций). И также это требуется для возможности
          подтвердить бронирование.
        </WarningMessage>

        <div className="user-acc__info-wrapper">
          <div className="user-acc__info">
            <div className="user-acc__info-group">
              <h2 className="user-acc__info-title title-reset">Фамилия:</h2>
              <span className="user-acc__info-text">Иванов</span>
            </div>
            <div className="user-acc__info-group">
              <h2 className="user-acc__info-title title-reset">Имя:</h2>
              <span className="user-acc__info-text">Иван</span>
            </div>
            <div className="user-acc__info-group">
              <h2 className="user-acc__info-title title-reset">Отчество:</h2>
              <span className="user-acc__info-text">Иванович</span>
            </div>
            <div className="user-acc__info-group">
              <h2 className="user-acc__info-title title-reset">Почта:</h2>
              <span className="user-acc__info-text">i.i.ivanov@urfu.me</span>
            </div>
            <div className="user-acc__info-group">
              <h2 className="user-acc__info-title title-reset">Студент:</h2>
              <span className="user-acc__info-checkbox">
                <CheckmarkSVG classNames="user-acc__info-checkbox-mark" />
              </span>
            </div>
            <div className="user-acc__info-group">
              <h2 className="user-acc__info-title title-reset">Имя пользователя telegram:</h2>
              <span className="user-acc__info-text">@IvanIvanov</span>
            </div>
          </div>
          <div className="user-acc__info-btns">
            <button className="user-acc__info-edit-btn btn-reset">Редактировать</button>
            <button className="user-acc__info-change-password-btn btn-reset">Сменить пароль</button>
          </div>
        </div>

        <form className="user-acc__info-wrapper">
          <div className="user-acc__info">
            <button className="user-acc__close-edit-btn btn-reset">
              <CloseCrossSVG />
            </button>
            <div className="user-acc__info-group">
              <label className="user-acc__info-title" htmlFor="last-name">Фамилия:</label>
              <input className="user-acc__info-input" type="text" name="last-name" id="last-name" autoCapitalize="words"
                value="Иванов"
              />
            </div>
            <div className="user-acc__info-group">
              <label className="user-acc__info-title" htmlFor="first-name">Имя:</label>
              <input className="user-acc__info-input" type="text" name="first-name" id="first-name" autoCapitalize="words"
                value="Иван"
              />
            </div>
            <div className="user-acc__info-group">
              <label className="user-acc__info-title" htmlFor="patronymic">Отчество:</label>
              <input className="user-acc__info-input" type="text" name="patronymic" id="patronymic" autoCapitalize="words"
                value="Иванович"
              />
            </div>
            <div className="user-acc__info-group">
              <label className="user-acc__info-title" htmlFor="email">Почта:</label>
              <input className="user-acc__info-input" type="text" name="email" id="email" autoCapitalize="words"
                value="i.i.ivanov@urfu.me"
              />
            </div>
            <div className="user-acc__info-group">
              <label className="user-acc__info-title" htmlFor="telegram">Имя пользователя telegram:</label>
              <input className="user-acc__info-input" type="text" name="telegram" id="telegram" autoCapitalize="words"
                value="@IvanIvanov"
              />
            </div>
          </div>
          <div className="user-acc__info-btns">
            <button className="user-acc__info-edit-btn btn-reset">Редактировать</button>
            <button className="user-acc__info-change-password-btn btn-reset">Сменить пароль</button>
          </div>
        </form>

        <h2 className="user-acc__booked-list-title title-reset">Мои бронирования</h2>
        <ul className="user-acc__booked-list list-reset">
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
              <button className="booking__info-cancel-btn btn-reset">Отменить</button>
            </div>
          </li>
        </ul>
        <form action="#" className="user-acc__submit-form submit-form cb-form">
          <div className="submit-form__top cb-form-top">
            <h2 className="submit-form__title cb-form-title title-reset">Отмена бронирования</h2>
          </div>
          <div className="submit-form__bottom cb-form-bottom">
            <h3 className="submit-form__sub-title">Вы уверены, что хотите отменить бронирование?</h3>
            <div className="submit-form__btns">
              <button className="submit-form__cancel-btn btn-reset">Нет</button>
              <button className="submit-form__submit-btn btn-reset">Да</button>
            </div>
          </div>
        </form>
      </article>
    </Layout>
  );
}
