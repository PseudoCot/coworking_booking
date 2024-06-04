import { useState, FormEventHandler, useEffect, ChangeEvent, useCallback } from 'react';
import { useAppDispatch } from '../hooks';
import useInput from '../hooks/use-input';
import emailValidationChecker from '../shared/email-validation-checker';
import { registerAction } from '../store/api-actions';
import passwordValidationChecker from '../shared/password-validation-checker';
import { validateStringsLength } from '../shared/validate-strings-length';
import FormInputGroup from './form-input-group';

export default function RegisterForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [email, setEmail, emailError, setEmailError, checkEmailValidity] = useInput(emailValidationChecker);
  const [password, setPassword, passwordError, setPasswordError, checkPasswordValidity] = useInput(passwordValidationChecker);
  const [repeatedPassword, setRepeatedPassword, repeatedPasswordError, setRepeatedPasswordError, checkRepeatedPasswordValidity] = useInput(
    (repeatedPass: string) => password === repeatedPass // проверить
  );

  const handleLastNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value), [setLastName]);
  const handleFirstNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value), [setFirstName]);
  const handlePatronymicChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setPatronymic(e.target.value), [setPatronymic]);
  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), [setEmail]);
  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), [setPassword]);
  const handleRepeatedPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setRepeatedPassword(e.target.value), [setRepeatedPassword]);

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (checkEmailValidity() && checkPasswordValidity() && checkRepeatedPasswordValidity()) {
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
    <form className="register__form register-form cb-form" action="#" onSubmit={handleSubmit}>
      <div className="register-form__wrapper cb-form-wrapper">
        <div className="register-form__top cb-form-top">
          <h2 className="register-form__title cb-form-title title-reset">Регистрация</h2>
        </div>
        <div className="register-form__bottom cb-form-bottom">
          <FormInputGroup groupClasses='register-form__input-group' labelClasses='register-form__label' inputClasses='register-form__input'
            labelText='Фамилия' name='last-name' type='text' autoCapitalize='words' autoComplete='last-name' required
            value={lastName} onChange={handleLastNameChange}
          />
          <FormInputGroup groupClasses='register-form__input-group' labelClasses='register-form__label' inputClasses='register-form__input'
            labelText='Имя' name='first-name' type='text' autoCapitalize='words' autoComplete='first-name' required
            value={firstName} onChange={handleFirstNameChange}
          />
          <FormInputGroup groupClasses='register-form__input-group' labelClasses='register-form__label' inputClasses='register-form__input'
            labelText='Отчество' name='patronymic' type='text' autoCapitalize='words' autoComplete='patronymic'
            value={patronymic} onChange={handlePatronymicChange}
          />
          <FormInputGroup groupClasses='register-form__input-group' labelClasses='register-form__label' inputClasses='register-form__input'
            labelText='Почта' name='email' type='email' inputMode='email' autoComplete='email' required
            value={email} onChange={handleEmailChange} showError={emailError} setShowError={setEmailError}
            tooltipClasses='register-form__tooltip' tooltipText='Используйте адрес электронной почты, который содержит домен urfu.ru или ufru.me'
            errorClasses='register-form__group-error' errorText='Адрес электронной почты не соответствует домену urfu.ru или ufru.me'
          />
          <FormInputGroup groupClasses='register-form__input-group' labelClasses='register-form__label' inputClasses='register-form__input'
            labelText='Пароль' name='password' type='password' autoComplete='new-password' required
            value={password} onChange={handlePasswordChange} showError={passwordError} setShowError={setPasswordError}
            tooltipClasses='register-form__tooltip' tooltipText='Пароль должен содержать не менее 8 символов, среди которых есть латинские буквы, хотя бы 1 строчная и заглавная буква, не менее 1 цифры и хотя бы 1 спец. символ'
            errorClasses='register-form__group-error' errorText='Пароль не соответствует требованиям сложности'
          />
          <FormInputGroup groupClasses='register-form__input-group' labelClasses='register-form__label' inputClasses='register-form__input'
            labelText='Повторите пароль' name='password-repeat' type='password' autoComplete='new-password' required
            value={repeatedPassword} onChange={handleRepeatedPasswordChange} showError={repeatedPasswordError} setShowError={setRepeatedPasswordError}
            errorClasses='register-form__group-error' errorText='Пароли не совпадают'
          />
          <button className="register-form__submit-btn cb-form-btn cb-light-btn btn-reset"
            type='submit' disabled={!submitEnabled}
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </form>
  );
}
