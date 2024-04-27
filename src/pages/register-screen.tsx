import Layout from '../components/layout';
import TipSVG from '../components/svg/tip';

export type RegisterScreenProps = {};

export default function RegisterScreen({ }: RegisterScreenProps): JSX.Element {
  return (
    <Layout>
      <article className="register">
        <h1 className="register__title cb-title title-reset">Регистрация</h1>

        <form className="register__form register-form cb-form" action="">
          <div className="register-form__wrapper cb-form-wrapper">
            <div className="register-form__top cb-form-top">
              <h2 className="register-form__title cb-form-title title-reset">Регистрация</h2>
            </div>
            <div className="register-form__bottom cb-form-bottom">
              <div className="register-form__input-group cb-form-group">
                <label className="register-form__label cb-form-label" htmlFor="last-name">Фамилия:</label>
                <input className="register-form__input cb-form-input" type="text" name="last-name" id="last-name"
                  autoCapitalize="words" autoComplete="last-name"
                />
              </div>
              <div className="register-form__input-group cb-form-group">
                <label className="register-form__label cb-form-label" htmlFor="first-name">Имя:</label>
                <input className="register-form__input cb-form-input" type="text" name="first-name" id="first-name"
                  autoCapitalize="words" autoComplete="first-name"
                />
              </div>
              <div className="register-form__input-group cb-form-group">
                <label className="register-form__label cb-form-label" htmlFor="patronymic">Отчество:</label>
                <input className="register-form__input cb-form-input" type="text" name="patronymic" id="patronymic"
                  autoCapitalize="words" autoComplete="patronymic"
                />
              </div>
              <div className="register-form__input-group cb-form-group">
                <label className="register-form__label cb-form-label" htmlFor="email">Почта:</label>
                <input className="register-form__input cb-form-input" type="email" name="email" id="email" inputMode="email"
                  autoComplete="email"
                />
                <span className="register-form__tooltip cb-form-tooltip"
                  data-tip="Используйте адрес электронной почты, который содержит домен urfu.ru или ufru.me"
                >
                  <TipSVG />
                </span>
              </div>
              <div className="register-form__input-group cb-form-group">
                <label className="register-form__label cb-form-label" htmlFor="password">Пароль:</label>
                <input className="register-form__input cb-form-input" type="password" name="password" id="password"
                  autoComplete="new-password"
                />
                <span className="register-form__tooltip cb-form-tooltip"
                  data-tip="Пароль должен содержать не менее 8 символов, среди которых есть латинские буквы, хотя бы 1 цифра и хотя бы 1 спец. символ"
                >
                  <TipSVG />
                </span>
              </div>
              <div className="register-form__input-group cb-form-group">
                {/* добавить информацию о несовпадении паролей */}
                <label className="register-form__label cb-form-label" htmlFor="password-repeat">Повторите пароль:</label>
                <input className="register-form__input cb-form-input" type="password" name="password-repeat"
                  id="password-repeat" autoComplete="new-password"
                />
              </div>
              <button className="register-form__submit-btn cb-form-btn btn-reset">Зарегистрироваться</button>
            </div>
          </div>
        </form>
      </article>
    </Layout>
  );
}
