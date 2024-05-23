import { useState, FormEventHandler, useEffect } from 'react';
import useInput from '../hooks/use-input';
import { validateStringsLength } from '../shared/validate-strings-length';
import CloseCrossSVG from './svg/close-cross';
import emailValidationChecker from '../shared/email-validation-checker';
import { updateUserDataAction } from '../store/api-actions';
import { useAppDispatch } from '../hooks';

type UserInfoEditingFormProps = {
  lastName: string;
  firstName: string;
  patronymic?: string;
  email: string;
  onCloseEditingClick: FormEventHandler;
  onChangePasswordClick: FormEventHandler;
};

export default function UserInfoEditingForm({ lastName: initialLastName, firstName: initialFirstName,
  patronymic: initialPatronymic, email: initialEmail,
  onCloseEditingClick: handleCloseEditingClick, onChangePasswordClick: handleChangePasswordClick }
  : UserInfoEditingFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [submitEnabled, setSubmitEnabled] = useState(true);

  const [lastName, setLastName] = useState(initialLastName);
  const [firstName, setFirstName] = useState(initialFirstName);
  const [patronymic, setPatronymic] = useState(initialPatronymic);
  const [email, setEmail, , , processEmailValidation] = useInput(emailValidationChecker, initialEmail);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (processEmailValidation()) {
      dispatch(updateUserDataAction({
        firstName,
        lastName,
        patronymic,
        email,
      }));

      handleCloseEditingClick(e);
    }
  };

  useEffect(() => {
    // проверить необходимость в установке таймера до проверки
    setSubmitEnabled(validateStringsLength([lastName, firstName, email]));
  }, [lastName, firstName, email]);

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
          <div className="user-acc__info-group">
            <label className="user-acc__info-title" htmlFor="email">Почта:</label>
            <input className="user-acc__info-input" type="text" name="email" id="email" autoCapitalize="words"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="user-acc__info-btns">
          <button className="user-acc__info-edit-btn btn-reset" type='submit' disabled={!submitEnabled}>Редактировать</button>
          <button className="user-acc__info-change-password-btn btn-reset" onClick={handleChangePasswordClick}>Сменить пароль</button>
        </div>
      </form>
    </div>
  );
}
