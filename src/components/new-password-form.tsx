import { useState, FormEventHandler, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import useInput from '../hooks/use-input';
import { changePasswordAction } from '../store/api-actions';
import { validateStringsLength } from '../shared/validate-strings-length';
import checkPasswordValidity from '../shared/check-password-validity';
import TipSVG from './svg/tip';

export default function NewPasswordForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [password, setPassword, passwordError, processPasswordValidation] = useInput(checkPasswordValidity);
  const [repeatedPassword, setRepeatedPassword, repeatedPasswordError, processRepeatedPasswordValidation] = useInput(
    (value: string) => password === value // проверить
  );

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (processPasswordValidation() && processRepeatedPasswordValidation()) {
      dispatch(changePasswordAction(password));
    }
  };

  useEffect(() => {
    setSubmitDisabled(validateStringsLength([password, repeatedPassword]));
  }, [password, repeatedPassword]);

  return (
    <form className="new-password__form new-password-form cb-form" action="#" onSubmit={handleSubmit}>
      <div className="new-password-form__wrapper cb-form-wrapper">
        <div className="new-password-form__top cb-form-top">
          <h2 className="new-password-form__title cb-form-title title-reset">Сменить пароль</h2>
        </div>
        <div className="new-password-form__bottom cb-form-bottom">
          <div className="new-password-form__input-group cb-form-group">
            <label className="new-password-form__label cb-form-label" htmlFor="password">Новый пароль:</label>
            <input className="new-password-form__input cb-form-input"
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
          <div className="new-password-form__input-group cb-form-group">
            <label className="new-password-form__label cb-form-label" htmlFor="password-repeat">Повторите пароль:</label>
            <input className="new-password-form__input cb-form-input"
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
          <button className="new-password-form__set-password-btn cb-form-btn btn-reset"
            type="submit" disabled={submitDisabled}
          >
            Сохранить
          </button>
        </div>
      </div>
    </form>
  );
}
