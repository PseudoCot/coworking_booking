import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getAuthStatus, isUserTelegramConnected } from '../store/user-process/selectors';
import DoorSVG from './svg/door';
import LogoSVG from './svg/logo';
import { AuthStatuses } from '../consts';
import { logoutAction } from '../store/api-actions';
import { AppRoutes } from '../routes';
import ExclamationMarkInCircleSVG from './svg/exclamation-mark-in-circle';
import useUserFullName from '../hooks/use-user-full-name';

export default function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const userTelegramConnected = useAppSelector(isUserTelegramConnected);
  const userFullName = useUserFullName();

  const handleLogoutClick = () => {
    if (authStatus === AuthStatuses.Auth) {
      dispatch(logoutAction());
    }
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to={AppRoutes.Main.FullPath} className="header__logo-link">
          <LogoSVG />
        </Link>
      </div>
      <nav className="header__nav nav">
        <ul className="nav__items list-reset">
          <li className="nav__item">
            <Link to={AppRoutes.Coworkings.FullPath} className="nav__item-link cb-link">Бронирование</Link>
          </li>
          <li className="nav__item">
            <Link to={AppRoutes.Calendar.FullPath} className="nav__item-link cb-link">Календарь</Link>
          </li>
        </ul>
      </nav>
      <div className="main-controls">
        {/* <button className="main-controls__language-btn language-btn btn-reset">
          <PlanetSVG classNames="language-btn__icon" />
          <span className="language-btn__text">RU</span>
          <SelectArrowSVG classNames="language-btn__arrow" />
        </button> */}

        {authStatus === AuthStatuses.Auth
          ?
          <>
            {userTelegramConnected ||
              <ExclamationMarkInCircleSVG classes="main-controls__warning-sign" />}
            <Link to={AppRoutes.User.FullPath} className="main-controls__user-acc-btn cb-white-btn">{userFullName}</Link>
            <button className="main-controls__logout-btn btn-reset" onClick={handleLogoutClick}>
              <DoorSVG />
            </button>
          </>
          :
          <>
            <Link to={AppRoutes.Register.FullPath} className="main-controls__register-btn cb-hollow-btn">Регистрация</Link>
            <Link to={AppRoutes.Login.FullPath} className="main-controls__login-btn cb-white-btn">Вход</Link>
          </>}
      </div>
    </header>
  );
}
