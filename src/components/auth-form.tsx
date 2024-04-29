import { FormEventHandler, useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks';
import { loginAction } from '../store/api-actions';
import checkEmailValidity from '../shared/check-email-validity';
import useInput from '../hooks/use-input';

export default function AuthForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [email, setEmail, , processEmailValidation] = useInput(checkEmailValidity);
  const [password, setPassword] = useState('');

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    dispatch(loginAction({
      email: email,
      password: password,
    }));
  };

  useEffect(() => {
    setSubmitDisabled(processEmailValidation() && password.length > 0);
  }, [email, password, processEmailValidation]);

  return (
    <form className="auth__form auth-form cb-form" action="#" onSubmit={handleSubmit}>
      <div className="auth-form__wrapper cb-form-wrapper">
        <div className="auth-form__top cb-form-top">
          <h2 className="auth-form__title cb-form-title title-reset">Вход</h2>
        </div>
        <div className="auth-form__bottom cb-form-bottom">
          <div className="auth-form__input-group cb-form-group">
            <label className="auth-form__label cb-form-label" htmlFor="email">Почта:</label>
            <input
              className="auth-form__input cb-form-input"
              type="email"
              name="email"
              id="email"
              inputMode="email"
              autoComplete="email current-login current-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth-form__input-group cb-form-group">
            <label className="auth-form__label cb-form-label" htmlFor="password">Пароль:</label>
            <input className="auth-form__input cb-form-input"
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="auth-form__btns">
            <button className="auth-form__submit-btn cb-form-btn btn-reset" type='submit' disabled={submitDisabled}>Войти</button>
            <button className="auth-form__reset-password-btn cb-form-darker-btn btn-reset">Восстановить пароль</button>
          </div>
        </div>
      </div>
    </form>
  );
}
