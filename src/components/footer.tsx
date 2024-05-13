import { Link } from 'react-router-dom';
import CrossSVG from './svg/cross';
import TelegramSVG from './svg/telegram';
import VkSVG from './svg/vk';
import { AppRoutes } from '../routes';

export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__contacts">
          <h2 className="footer__contacts-header title-reset">Контакты:</h2>
          <div className="footer__contacts-group">
            <span className="footer__contacts-title">Техническая поддержка:</span>
            <span className="footer__contacts-desc">
              Тел. <a className="footer__contacts-value" href="tel:+79999999999">+7 (999) 999-99-99</a>
            </span>
          </div>
          <div className="footer__contacts-group">
            <span className="footer__contacts-title">По вопросам сотрудничества:</span>
            <span className="footer__contacts-desc">
              Тел. <a className="footer__contacts-value" href="tel:+79999999999">+7 (999) 999-99-99</a>
            </span>
          </div>
        </div>
        <div className="footer__media">
          <a href="#" className="footer__media-link">
            <TelegramSVG />
          </a>
          <a href="#" className="footer__media-link">
            <VkSVG />
          </a>
        </div>
      </div>
      <div className="footer__credits">
        <span className="footer__credits-left">Брусника</span>
        <span className="footer__credits-middle">
          <CrossSVG />
        </span>
        <span className="footer__credits-right">Lorem Ipsum</span>
      </div>
      <div className="temp-links">
        <Link to={AppRoutes.Main.FullPath}>Index</Link>
        <Link to={AppRoutes.Coworkings.FullPath}>Coworkings</Link>
        <Link to={AppRoutes.Calendar.FullPath}>Calendar</Link>
        <Link to={AppRoutes.Booking.FullPath}>Booking</Link>
        <Link to={AppRoutes.Register.FullPath}>Register</Link>
        <Link to={AppRoutes.Auth.FullPath}>Auth</Link>
        <Link to={AppRoutes.UserAcc.FullPath}>UserAcc</Link>
        <Link to={AppRoutes.NewPassword.FullPath}>NewPass</Link>
        <Link to={AppRoutes.PasswordRecovery.FullPath}>InputEmail</Link>
      </div>
    </footer>
  );
}
