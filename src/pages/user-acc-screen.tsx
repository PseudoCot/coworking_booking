import { FormEventHandler, useCallback, useState } from 'react';
import Layout from '../components/layout';
import UserInfoCard from '../components/user-info-card';
import WarningMessage from '../components/warning-message';
import { useAppDispatch } from '../hooks';
import UserInfoEditingForm from '../components/user-info-editing-form';
import { cancelBookingAction } from '../store/api-actions';
import SubmitForm from '../components/submit-form';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../routes';
import Loader from '../components/loader';
import useUserData from '../hooks/use-user-data';

export default function UserAccScreen(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userData = useUserData();

  const [editingInfo, setEditingInfo] = useState(false);
  const [showChangePasswordSubmit, setShowChangePasswordSubmit] = useState(false);
  const [showBookingCancelSubmit, setShowBookingCancelSubmit] = useState(false);

  const handleEditClick: FormEventHandler = useCallback((e) => {
    e.preventDefault();
    setEditingInfo((prev) => !prev);
  }, [setEditingInfo]);
  const handleChangePasswordClick: FormEventHandler = useCallback((e) => {
    e.preventDefault();

    setShowChangePasswordSubmit(true);
  }, []);

  const handleChangePasswordDismiss = useCallback(() => {
    setShowChangePasswordSubmit((prev) => !prev);
  }, []);
  const handleChangePasswordSubmit = useCallback(() => {
    navigate(AppRoutes.ChangePassword.FullPath);
  }, [navigate]);

  const handleBookingCancelDismiss = useCallback(() => {
    setShowBookingCancelSubmit((prev) => !prev);
  }, [setShowBookingCancelSubmit]);
  const createHandleBookingCancelSubmit = useCallback((bookingId: number) => () => {
    setShowBookingCancelSubmit((prev) => !prev);
    dispatch(cancelBookingAction(bookingId));
  }, [dispatch, setShowBookingCancelSubmit]);

  return (
    <Layout>
      <article className="user-acc">
        <h1 className="user-acc__title cb-title title-reset">Личный кабинет</h1>

        {userData
          ?
          <>
            {userData.telegramConnected ||
              <WarningMessage title='Предупреждение!' >
                Заполните имя пользователя в telegram, это необходимо, чтобы мы могли оповещать вас в случае непредвиденного
                закрытия коворкинга (из-за подготовки к мероприятию/аварийных ситуаций). И также это требуется для возможности
                подтвердить бронирование.
              </WarningMessage>}

            <UserInfoCard {...userData} onEditClick={handleEditClick} onChangePasswordClick={handleChangePasswordClick} />

            {editingInfo &&
              <UserInfoEditingForm {...userData} onCloseEditingClick={handleEditClick} onChangePasswordClick={handleChangePasswordClick} />}

            {showChangePasswordSubmit &&
              <SubmitForm title={'Смена пароля'} question={'Вы уверены, что хотите сменить пароль?'}
                dismissText={'Нет'} submitText={'Да'} onDismiss={handleChangePasswordDismiss}
                onSubmit={handleChangePasswordSubmit}
              />}

            <h2 className="user-acc__booked-list-title title-reset">Мои бронирования</h2>
            {/* <ul className="user-acc__booked-list list-reset">
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
            </ul> */}

            {showBookingCancelSubmit &&
              <SubmitForm title={'Отмена бронирования'} question={'Вы уверены, что хотите отменить бронирование?'}
                dismissText={'Нет'} submitText={'Да'} onDismiss={handleBookingCancelDismiss}
                onSubmit={createHandleBookingCancelSubmit()}
              />}
          </>
          : <Loader horizontalAlignCenter />}
      </article>
    </Layout>
  );
}
