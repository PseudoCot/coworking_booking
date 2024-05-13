import { useCallback, useState } from 'react';
import Layout from '../components/layout';
import UserInfoCard from '../components/user-info-card';
import WarningMessage from '../components/warning-message';
import { useAppDispatch, useAppSelector } from '../hooks';
import EditingUserInfoForm from '../components/editing-user-info-form';
import { cancelBookingAction, requestChangePasswordAction } from '../store/api-actions';
import { getUserData } from '../store/user-process/selectors';
import SubmitForm from '../components/submit-form';

export default function UserAccScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const [editingInfo, setEditingInfo] = useState(false);
  const [showCancelForm, setShowCancelForm] = useState(false);

  const handleEditClick = useCallback(() => {
    setEditingInfo((prev) => !prev);
  }, [setEditingInfo]);
  const handleChangePasswordClick = useCallback(() => {
    dispatch(requestChangePasswordAction());
  }, [dispatch]);

  const handleCancelDismiss = useCallback(() => {
    setShowCancelForm((prev) => !prev);
  }, [setShowCancelForm]);
  const handleCancelSubmit = useCallback(() => {
    setShowCancelForm((prev) => !prev);
    dispatch(cancelBookingAction('irit')); // заменить статическуя строку
  }, [dispatch, setShowCancelForm]);

  const userData = useAppSelector(getUserData);

  return (
    <Layout>
      <article className="user-acc">
        <h1 className="user-acc__title cb-title title-reset">Личный кабинет</h1>

        {/* {userData.telegram ||
          <WarningMessage title='Предупреждение!' >
            Заполните имя пользователя в telegram, это необходимо, чтобы мы могли оповещать вас в случае непредвиденного
            закрытия коворкинга (из-за подготовки к мероприятию/аварийных ситуаций). И также это требуется для возможности
            подтвердить бронирование.
          </WarningMessage>} */}

        {/* {editingInfo
          ?
          <UserInfoCard {...userData} onEditClick={handleEditClick} onChangePasswordClick={handleChangePasswordClick} />
          :
          <EditingUserInfoForm {...userData} onCloseEditingClick={handleEditClick} onChangePasswordClick={handleChangePasswordClick} />} */}

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
        {showCancelForm &&
          <SubmitForm title={'Отмена бронирования'} question={'Вы уверены, что хотите отменить бронирование?'}
            dismissText={'Нет'} submitText={'Да'} onDismiss={handleCancelDismiss} onSubmit={handleCancelSubmit}
          />}
      </article>
    </Layout>
  );
}
