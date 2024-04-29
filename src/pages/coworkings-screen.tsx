import CoworkingList from '../components/coworking-list';
import Layout from '../components/layout';

export default function CoworkingsScreen(): JSX.Element {
  return (
    <Layout>
      <article className="coworkings">
        <h1 className="coworkings__title cb-title title-reset">Коворкинги</h1>

        <form className="coworkings__searching searching">
          <span className="searching__institute">
            <input className="searching__institute-input" type="text" name="institute" id="institute" placeholder="Институт"
              autoComplete="institute"
            />
          </span>
          <span className="searching__separator-line"></span>
          <span className="searching__audience">
            <input className="searching__audience-input" type="text" name="coworking" id="coworking" placeholder="Коворкинг"
              autoComplete="audience"
            />
          </span>
          <span className="searching__separator-line"></span>
          <button className="searching__submit-btn btn-reset" type="submit">Поиск</button>
          <span className="searching__separator-line"></span>
          <button className="searching__show-all-btn btn-reset">Показать все</button>
        </form>

        <CoworkingList />
      </article>
    </Layout>
  );
}
