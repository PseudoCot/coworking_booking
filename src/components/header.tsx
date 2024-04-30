import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getAuthStatus } from '../store/user-process/selectors';
import ExitSVG from './svg/exit';
import LogoSVG from './svg/logo';
import { AuthStatuses } from '../consts';
import { logoutAction } from '../store/api-actions';

export default function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);

  const handleLogoutButtonClick = () => {
    if (authStatus === AuthStatuses.Auth) {
      dispatch(logoutAction());
    }
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" className="header__logo-link">
          <LogoSVG />
        </Link>
      </div>
      <nav className="header__nav nav">
        <ul className="nav__items list-reset">
          <li className="nav__item">
            <Link to="/coworkings" className="nav__item-link">Бронирование</Link>
          </li>
          <li className="nav__item">
            <Link to="/calendar" className="nav__item-link">Календарь</Link>
          </li>
        </ul>
      </nav>
      <div className="main-controls">
        {/* <button className="main-controls__language-btn language-btn btn-reset">
          <LanguageSVG classNames="language-btn__icon" />
          <span className="language-btn__text">RU</span>
          <SelectArrowSVG classNames="language-btn__arrow" />
        </button> */}

        {authStatus === AuthStatuses.Auth ?
          <>
            <Link to="/user" className="main-controls__user-acc-btn">{'Имя пользователя'}</Link>
            <button className="main-controls__logout-btn btn-reset" onClick={handleLogoutButtonClick}>
              <ExitSVG />
            </button>
          </>
          :
          <>
            <Link to="/register" className="main-controls__register-btn">Регистрация</Link>
            <Link to="/auth" className="main-controls__auth-btn">Вход</Link>
          </>}
      </div>
    </header>
  );
}
