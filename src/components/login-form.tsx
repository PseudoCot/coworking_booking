import { FormEventHandler, useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks';
import { loginAction } from '../store/api-actions';
import checkEmailValidity from '../shared/check-email-validity';
import useInput from '../hooks/use-input';

export default function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [email, setEmail, , processEmailValidation] = useInput(checkEmailValidity);
  const [password, setPassword] = useState('');

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    dispatch(loginAction({
      email,
      password,
    }));
  };

  useEffect(() => {
    setSubmitEnabled(processEmailValidation() && password.length > 0);
  }, [email, password, processEmailValidation]);

  return (
    <form className="login__form login-form cb-form" action="#" onSubmit={handleSubmit}>
      <div className="login-form__wrapper cb-form-wrapper">
        <div className="login-form__top cb-form-top">
          <h2 className="login-form__title cb-form-title title-reset">Вход</h2>
        </div>
        <div className="login-form__bottom cb-form-bottom">
          <div className="login-form__input-group cb-form-group">
            <label className="login-form__label cb-form-label" htmlFor="email">Почта:</label>
            <input className="login-form__input cb-form-input"
              type="email"
              name="email"
              id="email"
              inputMode="email"
              autoComplete="email current-login current-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-form__input-group cb-form-group">
            <label className="login-form__label cb-form-label" htmlFor="password">Пароль:</label>
            <input className="login-form__input cb-form-input"
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-form__btns">
            <button className="login-form__submit-btn cb-form-btn btn-reset" type='submit' disabled={!submitEnabled}>Войти</button>
            <button className="login-form__reset-password-btn cb-form-btn btn-reset">Восстановить пароль</button>
          </div>
        </div>
      </div>
    </form>
  );
}
