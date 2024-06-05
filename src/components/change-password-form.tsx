import { useState, FormEventHandler, useEffect, ChangeEvent, useCallback } from 'react';
import { useAppDispatch } from '../hooks';
import useInput from '../hooks/use-input';
import { postPasswordChangeAction, postPasswordRecoveryAction } from '../store/api-actions';
import { validateStringsLength } from '../shared/validate-strings-length';
import passwordValidationChecker from '../shared/password-validation-checker';
import FormInputGroup from './form-input-group';

export type ChangePasswordFormProps = {
  token?: string;
  email?: string;
};

export default function ChangePasswordForm({ token, email }: ChangePasswordFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [password, setPassword, passwordError, setPasswordError, checkPasswordValidity] = useInput(passwordValidationChecker);
  const [repeatedPassword, setRepeatedPassword, repeatedPasswordError, setRepeatedPasswordError, checkRepeatedPasswordValidity] = useInput(
    (value: string) => password === value // проверить
  );

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), [setPassword]);
  const handleRepeatedPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setRepeatedPassword(e.target.value), [setRepeatedPassword]);

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (checkPasswordValidity() && checkRepeatedPasswordValidity()) {
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
          <FormInputGroup groupClasses='new-password-form__input-group' labelClasses='new-password-form__label' inputClasses='new-password-form__input'
            labelText='Новый пароль' name='password' type='password' autoComplete='new-password' required
            value={password} onChange={handlePasswordChange} showError={passwordError} setShowError={setPasswordError}
            tooltipClasses='new-password-form__tooltip' tooltipText='Пароль должен содержать не менее 8 символов, среди которых есть латинские буквы, хотя бы 1 строчная и заглавная буква, не менее 1 цифры и хотя бы 1 спец. символ'
            errorClasses='new-password-form__group-error' errorText='Пароль не соответствует требованиям сложности'
          />
          <FormInputGroup groupClasses='new-password-form__input-group' labelClasses='new-password-form__label' inputClasses='new-password-form__input'
            labelText='Повторите пароль' name='password-repeat' type='password' autoComplete='new-password' required
            value={repeatedPassword} onChange={handleRepeatedPasswordChange} showError={repeatedPasswordError} setShowError={setRepeatedPasswordError}
            errorClasses='new-password-form__group-error' errorText='Пароли не совпадают'
          />
          <button className="new-password-form__submit-btn form-btn light-btn btn-reset"
            type="submit" disabled={!submitEnabled}
          >
            Сохранить
          </button>
        </div>
      </div>
    </form>
  );
}
