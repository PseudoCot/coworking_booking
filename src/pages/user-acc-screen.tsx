type UserAccScreenProps = {};

export default function UserAccScreen({ }: UserAccScreenProps): JSX.Element {
  return (
    <article className="user-acc">
      <h1 className="user-acc__title cb-title title-reset">Личный кабинет</h1>

      <div className="user-acc__toast">
        <h2 className="user-acc__toast-title title-reset">Предупреждение!</h2>
        <p className="user-acc__toast-text paragraph-reset">
          Заполните имя пользователя в telegram, это необходимо, чтобы мы могли оповещать вас в случае непредвиденного
          закрытия коворкинга (из-за подготовки к мероприятию/аварийных ситуаций). И также это требуется для возможности
          подтвердить бронирование.
        </p>
      </div>

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
              <svg className="user-acc__info-checkbox-mark" width="13" height="11" viewBox="0 0 13 11" fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M5.03751 7.9864L1.34951 4.49239L0 6.04204L5.23322 11L13 1.34567L11.4625 0L5.03751 7.9864Z"
                  fill="#283593"
                />
              </svg>
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
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M7.27848 8.82397L0 16.199L1.6653 17.8864L8.94379 10.5114L16.3347 18.0003L18 16.3129L10.6091 8.82397L17.6522 1.6874L15.9869 0L8.94379 7.13657L2.01306 0.113892L0.347758 1.80129L7.27848 8.82397Z"
                fill="#283593" fillOpacity="0.8"
              />
            </svg>
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
  );
}
