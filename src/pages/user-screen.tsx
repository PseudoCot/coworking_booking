import { FormEventHandler, useCallback, useState } from 'react';
import Layout from '../components/layout';
import UserInfoCard from '../components/user-info-card';
import WarningMessage from '../components/warning-message';
import { useAppSelector } from '../hooks';
import UserInfoEditingForm from '../components/user-info-editing-form';
import SubmitForm from '../components/submit-form';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../routes';
import Loader from '../components/loader';
import useUserData from '../hooks/use-user-data';
import { showCheckEmailMessage } from '../store/user-process/selectors';
import BookedCoworkingList from '../components/booked-coworking-list';

export default function UserScreen(): JSX.Element {
  const navigate = useNavigate();

  const userData = useUserData();
  const showEmailMessage = useAppSelector(showCheckEmailMessage);

  const [editingInfo, setEditingInfo] = useState(false);
  const [showChangePasswordSubmit, setShowChangePasswordSubmit] = useState(false);

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

            {showEmailMessage &&
              <WarningMessage title='Предупреждение!' >
                Проверьте свою корпоративную почту, на неё должна прийти ссылка для обновления пароля.
              </WarningMessage>}

            <BookedCoworkingList />

            {showChangePasswordSubmit &&
              <SubmitForm title={'Смена пароля'} question={'Вы уверены, что хотите сменить пароль?'}
                dismissText={'Нет'} submitText={'Да'} onDismiss={handleChangePasswordDismiss}
                onSubmit={handleChangePasswordSubmit}
              />}
          </>
          : <Loader horizontalAlignCenter />}
      </article>
    </Layout>
  );
}
