import { useState, FormEventHandler, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import useInput from '../hooks/use-input';
import { postPasswordChangeAction, postPasswordRecoveryAction } from '../store/api-actions';
import { validatePassword as passwordValidator } from '../shared/validate-password';
import FormInputGroup from './form-input-group';
import validateStringsLength from '../shared/validate-strings-length';
import useInputChangeCallback from '../hooks/use-change-callback';
import Loader from './loader';
import { FetchingStatuses } from '../consts';
import { useUserFetchingStatus } from '../hooks/use-user-fetching-status';

export type ChangePasswordFormProps = {
  token?: string;
  email?: string;
};

export default function ChangePasswordForm({ token, email }: ChangePasswordFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const fetchingStatus = useUserFetchingStatus('passwordChangeFetchingStatus');

  const [password, setPassword, passwordError, setPasswordError, validatePassword] =
    useInput<string>(passwordValidator, '');
  const [repeatedPassword, setRepeatedPassword, repeatedPasswordError, setRepeatedPasswordError, validateRepeatedPassword] =
    useInput<string>((value: string) => password === value, '');

  const handlePasswordChange = useInputChangeCallback(setPassword);
  const handleRepeatedPasswordChange = useInputChangeCallback(setRepeatedPassword);

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (validatePassword() && validateRepeatedPassword()) {
      dispatch(token && email
        ? postPasswordRecoveryAction({
          password: password,
          repeatedPassword: repeatedPassword,
          token: token,
          email: email,
        })
        : postPasswordChangeAction({
          password: password,
          repeatedPassword: repeatedPassword,
        })
      );
    }
  };

  useEffect(() => {
    setSubmitEnabled(validateStringsLength([password, repeatedPassword]));
  }, [password, repeatedPassword]);

  return (
    <form className="new-password__form new-password-form form" action="#" onSubmit={handleSubmit}>
      <div className="new-password-form__wrapper form-wrapper">
        <div className="new-password-form__top form-top">
          <h2 className="new-password-form__title form-title title-reset">Сменить пароль</h2>
        </div>
        <div className="new-password-form__bottom form-bottom">
          {fetchingStatus === FetchingStatuses.Rejected &&
            <span className="login-form__submit-error">Не удалось обновить пароль. Попробуйте ещё раз</span>}
          <FormInputGroup groupClasses='new-password-form__input-group' labelClasses='new-password-form__label'
            inputClasses='new-password-form__input' labelText='Новый пароль'
            name='password' type='password' autoComplete='new-password' required maxLenght={200}
            value={password} onChange={handlePasswordChange} showError={passwordError} setShowError={setPasswordError}
            tooltipClasses='new-password-form__tooltip' tooltipText='Пароль должен содержать не менее 8 символов, среди которых есть латинские буквы, хотя бы 1 строчная и заглавная буква, не менее 1 цифры и хотя бы 1 спец. символ'
            errorClasses='new-password-form__group-error' errorText='Пароль не соответствует требованиям сложности'
          />
          <FormInputGroup groupClasses='new-password-form__input-group' labelClasses='new-password-form__label'
            inputClasses='new-password-form__input' labelText='Повторите пароль'
            name='password-repeat' type='password' autoComplete='new-password' required maxLenght={200}
            value={repeatedPassword} onChange={handleRepeatedPasswordChange}
            showError={repeatedPasswordError} setShowError={setRepeatedPasswordError}
            errorClasses='new-password-form__group-error' errorText='Пароли не совпадают'
          />
          <button className="new-password-form__submit-btn form-btn light-btn btn-reset"
            type="submit" disabled={!submitEnabled}
          >
            {fetchingStatus === FetchingStatuses.Pending ? <Loader alignCenter /> : 'Сохранить'}
          </button>
        </div>
      </div>
    </form>
  );
}
