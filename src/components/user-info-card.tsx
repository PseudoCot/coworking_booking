import CheckmarkSVG from './svg/checkmark';

type UserInfoCardProps = {
  lastName: string;
  firstName: string;
  patronymic: string;
  email: string;
  telegram: string;
  isStudent: boolean;
  onEditClick: () => void;
  onChangePasswordClick: () => void;
};

export default function UserInfoCard({ lastName, firstName, patronymic, email, telegram, isStudent,
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
        <div className="user-acc__info-group">
          <h2 className="user-acc__info-title title-reset">Имя пользователя telegram:</h2>
          <span className="user-acc__info-text">{telegram}</span>
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
