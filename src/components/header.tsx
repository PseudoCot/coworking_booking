import { useAppSelector } from '../hooks';
import { getAuthStatus } from '../store/user-process/selectors';

export default function Header(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  return (
    <header className="header">
      <div className="header__logo">
        <a href="/" className="header__logo-link">
          <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M51 25.5C51 39.5833 39.5833 51 25.5 51C11.4167 51 0 39.5833 0 25.5C0 11.4167 11.4167 0 25.5 0C39.5833 0 51 11.4167 51 25.5ZM9.17786 25.5C9.17786 34.5145 16.4855 41.8221 25.5 41.8221C34.5145 41.8221 41.8221 34.5145 41.8221 25.5C41.8221 16.4855 34.5145 9.17786 25.5 9.17786C16.4855 9.17786 9.17786 16.4855 9.17786 25.5Z"
              fill="#8C9EFF" fillOpacity="0.82"
            />
            <path
              d="M35.3077 19.2885C35.3077 22.7912 32.4681 25.6308 28.9654 25.6308C25.4626 25.6308 22.6231 22.7912 22.6231 19.2885C22.6231 15.7857 25.4626 12.9462 28.9654 12.9462C32.4681 12.9462 35.3077 15.7857 35.3077 19.2885Z"
              fill="#8C9EFF" fillOpacity="0.82"
            />
          </svg>
        </a>
      </div>
      <nav className="header__nav nav">
        <ul className="nav__items list-reset">
          <li className="nav__item">
            <a href="booking" className="nav__item-link">Бронирование</a>
          </li>
          <li className="nav__item">
            <a href="calendar" className="nav__item-link">Календарь</a>
          </li>
        </ul>
      </nav>
      <div className="main-controls">
        {/* <button className="main-controls__language-btn language-btn btn-reset">
          <svg className="language-btn__icon" width="21px" height="21px" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z"
              stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
            <path d="M13 2.04932C13 2.04932 16 5.99994 16 11.9999C16 17.9999 13 21.9506 13 21.9506" stroke="#000000"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
            <path d="M11 21.9506C11 21.9506 8 17.9999 8 11.9999C8 5.99994 11 2.04932 11 2.04932" stroke="#000000"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
            <path d="M2.62964 15.5H21.3704" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M2.62964 8.5H21.3704" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="language-btn__text">RU</span>
          <svg className="language-btn__arrow" width="10" height="6" viewBox="0 0 10 6" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
              d="M5 6L-5.08357e-07 0.906164L0.889471 1.57206e-07L5 4.18767L9.11053 8.75914e-07L10 0.906165L5 6Z"
              fill="#14191A"
            />
          </svg>
        </button> */}

        authStatus ? {
          <>
            <a href="user-acc" className="main-controls__user-acc-btn">Имя пользователя</a>
            <button className="main-controls__logout-btn btn-reset">
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 16L0.5 16L0.5 0L13.5 0V5L11.5 5V2H2.5V14L11.5 14V11H13.5V16Z" fill="#14191A" />
                <path d="M15.5 12L19.5 8L15.5 4L15.5 7L6.5 7L6.5 9L15.5 9V12Z" fill="#14191A" />
              </svg>
            </button>
          </>
        } : {
          <>
            <a href="register" className="main-controls__register-btn">Регистрация</a>
            <a href="auth" className="main-controls__login-btn">Вход</a>
          </>
        }
      </div>
    </header>
  );
}
