import Layout from '../components/layout';

export type MainScreenProps = {};

export default function MainScreen({ }: MainScreenProps): JSX.Element {
  return (
    <Layout>
      <article className="hero">
        <h1 className="hero__title title-reset">Там, где творчество встречает комфорт</h1>
        <form className="hero__searching searching">
          <div className="searching__audience">
            <input className="searching__audience-input" type="text" name="audience" id="audience"
              placeholder="Название коворкинга" autoComplete="audience"
            />
          </div>
          <span className="searching__separator-line"></span>
          <div className="searching__institute">
            <input className="searching__institute-input" type="text" name="institute" id="institute" placeholder="Институт"
              autoComplete="institute"
            />
          </div>
          <span className="searching__separator-line"></span>
          <button className="searching__submit-btn btn-reset" type="submit">Поиск</button>
        </form>
      </article>
    </Layout>
  );
}
