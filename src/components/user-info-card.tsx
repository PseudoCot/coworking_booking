import { FormEventHandler } from 'react';
import CheckmarkSVG from './svg/checkmark';

type UserInfoCardProps = {
  lastName: string;
  firstName: string;
  patronymic?: string;
  email: string;
  isStudent: boolean;

  onEditClick: FormEventHandler;
  onChangePasswordClick: FormEventHandler;
};

export default function UserInfoCard({ lastName, firstName, patronymic, email, isStudent,
  onEditClick: handleEditClick, onChangePasswordClick: handleChangePasswordClick
}: UserInfoCardProps): JSX.Element {
  return (
    <div className="user-acc__info-wrapper">
      <div className="user-acc__info">
        <div className="user-acc__info-group">
          <h2 className="user-acc__info-title title-reset">Фамилия:</h2>
          <span className="user-acc__info-text">{lastName}</span>
        </div>
        <div className="user-acc__info-group">
          <h2 className="user-acc__info-title title-reset">Имя:</h2>
          <span className="user-acc__info-text">{firstName}</span>
        </div>
        <div className="user-acc__info-group">
          <h2 className="user-acc__info-title title-reset">Отчество:</h2>
          <span className="user-acc__info-text">{patronymic}</span>
        </div>
        <div className="user-acc__info-group">
          <h2 className="user-acc__info-title title-reset">Почта:</h2>
          <span className="user-acc__info-text">{email}</span>
        </div>
        <div className="user-acc__info-group">
          <h2 className="user-acc__info-title title-reset">Студент:</h2>
          <span className="user-acc__info-checkbox">
            {isStudent &&
              <CheckmarkSVG classNames="user-acc__info-checkbox-mark" />}
          </span>
        </div>
      </div>
      <div className="user-acc__info-btns">
        <button className="user-acc__info-edit-btn btn-reset" onClick={handleEditClick}>Редактировать</button>
        <button className="user-acc__info-change-password-btn btn-reset"
          onClick={handleChangePasswordClick}
        >
          Сменить пароль
        </button>
      </div>
    </div>
  );
}
