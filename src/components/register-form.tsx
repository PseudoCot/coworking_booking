import { useState, FormEventHandler, useEffect, ChangeEvent, useCallback } from 'react';
import { useAppDispatch } from '../hooks';
import useInput from '../hooks/use-input';
import checkEmailValidity from '../shared/check-email-validity';
import { registerAction } from '../store/api-actions';
import checkPasswordValidity from '../shared/check-password-validity';
import { validateStringsLength } from '../shared/validate-strings-length';
import FormInputGroup from './form-input-group';

export default function RegisterForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [submitEnabled, setSubmitEnabled] = useState(false);

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [email, setEmail, emailError, processEmailValidation] = useInput(checkEmailValidity);
  const [password, setPassword, passwordError, processPasswordValidation] = useInput(checkPasswordValidity);
  const [repeatedPassword, setRepeatedPassword, repeatedPasswordError, processRepeatedPasswordValidation] = useInput(
    (value: string) => password === value // проверить
  );

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (processEmailValidation() && processPasswordValidation() && processRepeatedPasswordValidation()) {
      dispatch(registerAction({
        lastName,
        firstName,
        patronymic,
        email,
        password,
      }));
    }
  };

  const handleLastNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value), [setLastName]);
  const handleFirstNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value), [setFirstName]);
  const handlePatronymicChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setPatronymic(e.target.value), [setPatronymic]);
  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), [setEmail]);
  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), [setPassword]);
  const handleRepeatedPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setRepeatedPassword(e.target.value), [setRepeatedPassword]);

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
            labelText='Фамилия' name='patronymic' type='text' autoCapitalize='words' autoComplete='patronymic'
            value={patronymic} onChange={handlePatronymicChange}
          />
          <FormInputGroup groupClasses='register-form__input-group' labelClasses='register-form__label' inputClasses='register-form__input'
            labelText='Почта' name='email' type='text' inputMode='email' autoComplete='email' required
            value={email} onChange={handleEmailChange} showError={emailError}
            tooltipClasses='register-form__tooltip' tooltipText='Используйте адрес электронной почты, который содержит домен urfu.ru или ufru.me'
            errorClasses='register-form__group-error' errorText='Адрес электронной почты не соответствует домену urfu.ru или ufru.me'
          />
          <FormInputGroup groupClasses='register-form__input-group' labelClasses='register-form__label' inputClasses='register-form__input'
            labelText='Пароль' name='password' type='password' autoComplete='new-password' required
            value={password} onChange={handlePasswordChange} showError={passwordError}
            tooltipClasses='register-form__tooltip' tooltipText='Пароль должен содержать не менее 8 символов, среди которых есть латинские буквы, хотя бы 1 цифра и хотя бы 1 спец. символ'
            errorClasses='register-form__group-error' errorText='Пароль не соответствует требованиям сложности'
          />
          <FormInputGroup groupClasses='register-form__input-group' labelClasses='register-form__label' inputClasses='register-form__input'
            labelText='Повторите пароль' name='password-repeat' type='password' autoComplete='new-password' required
            value={repeatedPassword} onChange={handleRepeatedPasswordChange} showError={repeatedPasswordError}
            errorClasses='register-form__group-error' errorText='Пароли не совпадают'
          />
          <button className="register-form__submit-btn cb-form-btn btn-reset"
            type='submit' disabled={!submitEnabled}
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </form>
  );
}
