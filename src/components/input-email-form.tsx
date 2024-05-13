import { useState, FormEventHandler, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import useInput from '../hooks/use-input';
import TipSVG from './svg/tip';
import checkEmailValidity from '../shared/check-email-validity';

export default function InputEmailForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [submitEnabled, setSubmitEnabled] = useState(false);

  const [email, setEmail, emailError, processEmailValidation] = useInput(checkEmailValidity);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (processEmailValidation()) {
      dispatch(changePasswordAction(email));
    }
  };

  useEffect(() => {
    setSubmitEnabled(!!email);
  }, [email]);

  return (
    <form className="new-password__form new-password-form cb-form" action="#" onSubmit={handleSubmit}>
      <div className="new-password-form__wrapper cb-form-wrapper">
        <div className="new-password-form__top cb-form-top">
          <h2 className="new-password-form__title cb-form-title title-reset">Восстановить пароль</h2>
        </div>
        <div className="new-password-form__bottom cb-form-bottom">
          <div className="new-password-form__input-group cb-form-group">
            <label className="new-password-form__label cb-form-label" htmlFor="email">Укажите почту:</label>
            <input className="new-password-form__input cb-form-input"
              type="email"
              name="email"
              id="email"
              autoComplete="email current-login current-email"
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
          <button className="new-password-form__set-password-btn cb-form-btn btn-reset"
            type="submit" disabled={!submitEnabled}
          >
            Восстановить пароль
          </button>
        </div>
      </div>
    </form>
  );
}
