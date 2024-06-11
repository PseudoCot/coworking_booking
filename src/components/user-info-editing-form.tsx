import { useState, FormEventHandler, useEffect } from 'react';
import CloseCrossSVG from './svg/close-cross';
import { postUserDataAction } from '../store/api-actions';
import { useAppDispatch } from '../hooks';
import validateStringsLength from '../shared/validate-strings-length';
import { useUserFetchingStatus } from '../hooks/use-user-fetching-status';
import { FetchingStatuses } from '../consts';
import Loader from './loader';

type UserInfoEditingFormProps = {
  lastName: string;
  firstName: string;
  patronymic?: string;
  onCloseEditingClick: FormEventHandler;
  onChangePasswordClick: FormEventHandler;
};

export default function UserInfoEditingForm({ lastName: initialLastName, firstName: initialFirstName,
  patronymic: initialPatronymic,
  onCloseEditingClick: handleCloseEditingClick, onChangePasswordClick: handleChangePasswordClick }
  : UserInfoEditingFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const fetchingStatus = useUserFetchingStatus('userDataChangeFetchingStatus');

  const [lastName, setLastName] = useState(initialLastName);
  const [firstName, setFirstName] = useState(initialFirstName);
  const [patronymic, setPatronymic] = useState(initialPatronymic);

  const [submitEnabled, setSubmitEnabled] = useState(true);
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    dispatch(postUserDataAction({
      firstName,
      lastName,
      patronymic,
    }));

    handleCloseEditingClick(e);
  };

  useEffect(() => {
    // проверить необходимость в установке таймера до проверки
    setSubmitEnabled(validateStringsLength([lastName, firstName]));
  }, [lastName, firstName]);

  return (
    <div className="user-acc__info-form-wrapper">
      <form className="user-acc__info-form" action='#' onSubmit={handleSubmit}>
        <div className="user-acc__info">
          <button className="user-acc__close-edit-btn btn-reset" onClick={handleCloseEditingClick}>
            <CloseCrossSVG />
          </button>
          <div className="user-acc__info-group">
            <label className="user-acc__info-title" htmlFor="last-name">Фамилия:</label>
            <input className="user-acc__info-input" type="text" name="last-name" id="last-name" autoCapitalize="words"
              value={lastName} onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="user-acc__info-group">
            <label className="user-acc__info-title" htmlFor="first-name">Имя:</label>
            <input className="user-acc__info-input" type="text" name="first-name" id="first-name" autoCapitalize="words"
              value={firstName} onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="user-acc__info-group">
            <label className="user-acc__info-title" htmlFor="patronymic">Отчество:</label>
            <input className="user-acc__info-input" type="text" name="patronymic" id="patronymic" autoCapitalize="words"
              value={patronymic} onChange={(e) => setPatronymic(e.target.value)}
            />
          </div>
        </div>
        <div className="user-acc__info-btns">
          <button className="user-acc__info-edit-btn light-btn btn-reset" type='submit' disabled={!submitEnabled}>
            {fetchingStatus === FetchingStatuses.Pending ? <Loader horizontalAlignCenter /> : 'Редактировать'}
          </button>
          <button className="user-acc__info-change-password-btn light-btn btn-reset" onClick={handleChangePasswordClick}>
            Сменить пароль
          </button>
        </div>
      </form>
    </div>
  );
}
