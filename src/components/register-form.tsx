import { useState, FormEventHandler, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import useInput from '../hooks/use-input';
import checkEmailValidity from '../shared/check-email-validity';
import { registerAction } from '../store/api-actions';
import TipSVG from './svg/tip';
import checkPasswordValidity from '../shared/check-password-validity';
import { validateStringsLength } from '../shared/validate-strings-length';

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
          <div className="register-form__input-group cb-form-group">
            <label className="register-form__label cb-form-label" htmlFor="last-name">Фамилия:</label>
            <input className="register-form__input cb-form-input"
              type="text"
              name="last-name"
              id="last-name"
              autoCapitalize="words"
              autoComplete="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="register-form__input-group cb-form-group">
            <label className="register-form__label cb-form-label" htmlFor="first-name">Имя:</label>
            <input className="register-form__input cb-form-input"
              type="text"
              name="first-name"
              id="first-name"
              autoCapitalize="words"
              autoComplete="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="register-form__input-group cb-form-group">
            <label className="register-form__label cb-form-label" htmlFor="patronymic">Отчество:</label>
            <input className="register-form__input cb-form-input"
              type="text"
              name="patronymic"
              id="patronymic"
              autoCapitalize="words"
              autoComplete="patronymic"
              value={patronymic}
              onChange={(e) => setPatronymic(e.target.value)}
            />
          </div>
          <div className="register-form__input-group cb-form-group">
            <label className="register-form__label cb-form-label" htmlFor="email">Почта:</label>
            <input className="register-form__input cb-form-input"
              type="email"
              name="email"
              id="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="register-form__tooltip cb-form-tooltip"
              data-tip="Используйте адрес электронной почты, который содержит домен urfu.ru или ufru.me"
            >
              <TipSVG />
            </span>
            {emailError &&
              <span className="register-form__tooltip cb-form-tooltip"
                data-tip="Адрес электронной почты не соответствует домену urfu.ru или ufru.me"
              />}
          </div>
          <div className="register-form__input-group cb-form-group">
            <label className="register-form__label cb-form-label" htmlFor="password">Пароль:</label>
            <input className="register-form__input cb-form-input"
              type="password"
              name="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="register-form__tooltip cb-form-tooltip"
              data-tip="Пароль должен содержать не менее 8 символов, среди которых есть латинские буквы, хотя бы 1 цифра и хотя бы 1 спец. символ"
            >
              <TipSVG />
            </span>
            {passwordError &&
              <span className="register-form__tooltip cb-form-tooltip"
                data-tip="Пароль не соответствует требованиям сложности"
              />}
          </div>
          <div className="register-form__input-group cb-form-group">
            <label className="register-form__label cb-form-label" htmlFor="password-repeat">Повторите пароль:</label>
            <input className="register-form__input cb-form-input"
              type="password"
              name="password-repeat"
              id="password-repeat"
              autoComplete="new-password"
              value={repeatedPassword}
              onChange={(e) => setRepeatedPassword(e.target.value)}
            />
            {repeatedPasswordError &&
              <span className="register-form__tooltip cb-form-tooltip"
                data-tip="Пароли не совпадают"
              />}
          </div>
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
