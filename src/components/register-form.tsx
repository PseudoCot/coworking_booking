import { useState, FormEventHandler, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import useInput from '../hooks/use-input';
import { validateEmail as emailValidator } from '../shared/validate-email';
import { registerAction } from '../store/api-actions';
import { validatePassword as passwordValidator } from '../shared/validate-password';
import FormInputGroup from './form-input-group';
import validateStringsLength from '../shared/validate-strings-length';
import useInputChangeCallback from '../hooks/use-change-callback';
import Loader from './loader';
import { FetchingStatuses } from '../consts';
import { useUserFetchingStatus } from '../hooks/use-user-fetching-status';

export default function RegisterForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const fetchingStatus = useUserFetchingStatus('registerFetchingStatus');

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [email, setEmail, emailError, setEmailError, validateEmail] =
    useInput<string>(emailValidator, '');
  const [password, setPassword, passwordError, setPasswordError, validatePassword] =
    useInput<string>(passwordValidator, '');
  const [repeatedPassword, setRepeatedPassword, repeatedPasswordError, setRepeatedPasswordError, validateRepeatedPassword] =
    useInput<string>((repeatedPass: string) => password === repeatedPass, '');

  const handleLastNameChange = useInputChangeCallback(setLastName);
  const handleFirstNameChange = useInputChangeCallback(setFirstName);
  const handlePatronymicChange = useInputChangeCallback(setPatronymic);
  const handleEmailChange = useInputChangeCallback(setEmail);
  const handlePasswordChange = useInputChangeCallback(setPassword);
  const handleRepeatedPasswordChange = useInputChangeCallback(setRepeatedPassword);

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (validateEmail() && validatePassword() && validateRepeatedPassword()) {
      dispatch(registerAction({
        lastName,
        firstName,
        patronymic,
        email,
        password,
      }));
    }
  };

  useEffect(() => {
    // проверить необходимость в установке таймера до проверки
    setSubmitEnabled(validateStringsLength([lastName, firstName, email, password, repeatedPassword]));
  }, [lastName, firstName, email, password, repeatedPassword]);

  return (
    <form className="register__form register-form form" action="#" onSubmit={handleSubmit}>
      <div className="register-form__wrapper form-wrapper">
        <div className="register-form__top form-top">
          <h2 className="register-form__title form-title title-reset">Регистрация</h2>
        </div>
        <div className="register-form__bottom form-bottom">
          {fetchingStatus === FetchingStatuses.Rejected &&
            <span className="login-form__submit-error">Не удалось зарегистрироваться. Попробуйте ещё раз</span>}
          <FormInputGroup groupClasses='register-form__input-group' labelClasses='register-form__label'
            inputClasses='register-form__input' labelText='Фамилия'
            name='last-name' type='text' autoCapitalize='words' autoComplete='last-name' required maxLenght={100}
            value={lastName} onChange={handleLastNameChange}
          />
          <FormInputGroup groupClasses='register-form__input-group' labelClasses='register-form__label'
            inputClasses='register-form__input' labelText='Имя'
            name='first-name' type='text' autoCapitalize='words' autoComplete='first-name' required maxLenght={100}
            value={firstName} onChange={handleFirstNameChange}
          />
          <FormInputGroup groupClasses='register-form__input-group' labelClasses='register-form__label'
            inputClasses='register-form__input' labelText='Отчество'
            name='patronymic' type='text' autoCapitalize='words' autoComplete='patronymic' maxLenght={100}
            value={patronymic} onChange={handlePatronymicChange}
          />
          <FormInputGroup groupClasses='register-form__input-group' labelClasses='register-form__label'
            inputClasses='register-form__input' labelText='Почта'
            name='email' type='email' inputMode='email' autoComplete='email' required maxLenght={100}
            value={email} onChange={handleEmailChange} showError={emailError} setShowError={setEmailError}
            tooltipClasses='register-form__tooltip' tooltipText='Используйте адрес электронной почты, который содержит домен urfu.ru или ufru.me'
            errorClasses='register-form__group-error' errorText='Адрес электронной почты не соответствует домену urfu.ru или ufru.me'
          />
          <FormInputGroup groupClasses='register-form__input-group' labelClasses='register-form__label'
            inputClasses='register-form__input' labelText='Пароль'
            name='password' type='password' autoComplete='new-password' required maxLenght={200}
            value={password} onChange={handlePasswordChange} showError={passwordError} setShowError={setPasswordError}
            tooltipClasses='register-form__tooltip' tooltipText='Пароль должен содержать не менее 8 символов, среди которых есть латинские буквы, хотя бы 1 строчная и заглавная буква, не менее 1 цифры и хотя бы 1 спец. символ'
            errorClasses='register-form__group-error' errorText='Пароль не соответствует требованиям сложности'
          />
          <FormInputGroup groupClasses='register-form__input-group' labelClasses='register-form__label'
            inputClasses='register-form__input' labelText='Повторите пароль'
            name='password-repeat' type='password' autoComplete='new-password' required maxLenght={200}
            value={repeatedPassword} onChange={handleRepeatedPasswordChange}
            showError={repeatedPasswordError} setShowError={setRepeatedPasswordError}
            errorClasses='register-form__group-error' errorText='Пароли не совпадают'
          />
          <button className="register-form__submit-btn form-btn light-btn btn-reset"
            type='submit' disabled={!submitEnabled}
          >
            {fetchingStatus === FetchingStatuses.Pending ? <Loader alignCenter /> : 'Зарегистрироваться'}
          </button>
        </div>
      </div>
    </form>
  );
}
