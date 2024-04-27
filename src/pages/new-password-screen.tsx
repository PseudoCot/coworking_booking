import Layout from '../components/layout';

type NewPasswordScreenProps = {};

export default function NewPasswordScreen({ }: NewPasswordScreenProps): JSX.Element {
  return (
    <Layout>
      <article className="new-password">
        <form className="new-password__form new-password-form cb-form" action="">
          <div className="new-password-form__wrapper cb-form-wrapper">
            <div className="new-password-form__top cb-form-top">
              <h2 className="new-password-form__title cb-form-title title-reset">Сменить пароль</h2>
            </div>
            <div className="new-password-form__bottom cb-form-bottom">
              <div className="new-password-form__input-group cb-form-group">
                <label className="new-password-form__label cb-form-label" htmlFor="password">Новый пароль:</label>
                <input className="new-password-form__input cb-form-input" type="password" name="password" id="password"
                  autoComplete="new-password"
                />
              </div>
              <div className="new-password-form__input-group cb-form-group">
                <label className="new-password-form__label cb-form-label" htmlFor="password-repeat">Повторите пароль:</label>
                <input className="new-password-form__input cb-form-input" type="password" name="password-repeat"
                  id="password-repeat" autoComplete="new-password"
                />
              </div>
              <button className="new-password-form__set-password-btn cb-form-btn btn-reset">Сохранить</button>
            </div>
          </div>
        </form>
      </article>
    </Layout>
  );
}
