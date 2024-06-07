import { ChangeEvent, FormEventHandler, useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks';
import { loginAction } from '../store/api-actions';
import { validateEmail as emailValidator } from '../shared/validate-email';
import useInput from '../hooks/use-input';
import FormInputGroup from './form-input-group';
import { AppRoutes } from '../routes';
import validateStringsLength from '../shared/validate-strings-length';

export default function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const showSubmitError = false; // useAppSelector(getLoginError);

  const [email, setEmail, emailError, setEmailError, validateEmail] = useInput<string>(emailValidator, '');
  const [password, setPassword] = useState('');

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), [setEmail]);
  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), [setPassword]);

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (validateEmail()) {
      dispatch(loginAction({
        email,
        password,
      }));
    }
  };

  useEffect(() => {
    setSubmitEnabled(validateStringsLength([email, password]));
  }, [email, password, validateEmail]);

  return (
    <form className="login__form login-form form" action="#" onSubmit={handleSubmit}>
      <div className="login-form__wrapper form-wrapper">
        <div className="login-form__top form-top">
          <h2 className="login-form__title form-title title-reset">Вход</h2>
        </div>
        <div className="login-form__bottom form-bottom">
          {showSubmitError &&
            <span className="login-form__submit-error">Введённые данные не корректны. Попробуйте ещё раз</span>}
          <FormInputGroup groupClasses='login-form__input-group' labelClasses='login-form__label' inputClasses='login-form__input'
            labelText='Почта' name='email' type='email' inputMode='email' autoComplete='email current-login current-email' required
            value={email} onChange={handleEmailChange} showError={emailError} setShowError={setEmailError}
            errorClasses='register-form__group-error' errorText='Адрес электронной почты не соответствует домену urfu.ru или ufru.me'
          />
          <FormInputGroup groupClasses='login-form__input-group' labelClasses='login-form__label' inputClasses='login-form__input'
            labelText='Пароль' name='password' type='password' autoComplete='current-password' required
            value={password} onChange={handlePasswordChange}
          />
          <div className="login-form__btns">
            <button className="login-form__submit-btn form-btn light-btn btn-reset" type='submit' disabled={!submitEnabled}>
              Войти
            </button>
            <a href={AppRoutes.PasswordRecovery.FullPath} className="login-form__reset-password-btn form-btn light-btn btn-reset">
              Восстановить пароль
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}
