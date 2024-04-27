import { useAppSelector } from '../hooks';
import { getAuthStatus } from '../store/user-process/selectors';
import ExitSVG from './svg/exit';
import LanguageSVG from './svg/language';
import LogoSVG from './svg/logo';
import SelectArrowSVG from './svg/select-arrow';

export default function Header(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  return (
    <header className="header">
      <div className="header__logo">
        <a href="/" className="header__logo-link">
          <LogoSVG />
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
        <button className="main-controls__language-btn language-btn btn-reset">
          <LanguageSVG classNames="language-btn__icon" />
          <span className="language-btn__text">RU</span>
          <SelectArrowSVG classNames="language-btn__arrow" />
        </button>

        {authStatus ?
          <>
            <a href="user-acc" className="main-controls__user-acc-btn">Имя пользователя</a>
            <button className="main-controls__logout-btn btn-reset">
              <ExitSVG />
            </button>
          </>
          :
          <>
            <a href="register" className="main-controls__register-btn">Регистрация</a>
            <a href="auth" className="main-controls__login-btn">Вход</a>
          </>}
      </div>
    </header>
  );
}
