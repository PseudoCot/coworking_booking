type AuthScreenProps = {};

export default function AuthScreen({ }: AuthScreenProps): JSX.Element {
  return (
    <article className="auth">
      <h1 className="auth__title cb-title title-reset">Авторизация</h1>

      <form className="auth__form auth-form cb-form" action="">
        <div className="auth-form__wrapper cb-form-wrapper">
          <div className="auth-form__top cb-form-top">
            <h2 className="auth-form__title cb-form-title title-reset">Вход</h2>
          </div>
          <div className="auth-form__bottom cb-form-bottom">
            <div className="auth-form__input-group cb-form-group">
              <label className="auth-form__label cb-form-label" htmlFor="email">Почта:</label>
              <input className="auth-form__input cb-form-input" type="email" name="email" id="email" inputMode="email"
                autoComplete="email current-login current-email"
              />
            </div>
            <div className="auth-form__input-group cb-form-group">
              <label className="auth-form__label cb-form-label" htmlFor="password">Пароль:</label>
              <input className="auth-form__input cb-form-input" type="password" name="password" id="password"
                autoComplete="current-password"
              />
            </div>
            <div className="auth-form__btns">
              <button className="auth-form__submit-btn cb-form-btn btn-reset">Войти</button>
              <button className="auth-form__reset-password-btn cb-form-darker-btn btn-reset">Восстановить пароль</button>
            </div>
          </div>
        </div>
      </form>
    </article>
  );
}
