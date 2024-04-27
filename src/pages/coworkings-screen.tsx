import Layout from '../components/layout';

type CoworkingsScreenProps = {};

export default function CoworkingsScreen({ }: CoworkingsScreenProps): JSX.Element {
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

        <ul className="coworkings__list list-reset">
          <li className="coworkings__list-item">
            <img className="coworkings__item-img" src="img/cow-irit.jpg" alt="Коворкинг ИРИТ-РТФ" />
            <h3 className="coworkings__item-title title-reset">ИРИТ - РТФ</h3>
            <div className="coworkings__item-content">
              <span className="coworkings__item-content-title">Режим работы</span>
              <span className="coworkings__item-content-info">с&nbsp;10:00 до&nbsp;16:00</span>
            </div>
          </li>
          <li className="coworkings__list-item">
            <img className="coworkings__item-img" src="img/idea-terr.jpg" alt="Коворкинг 'Территория Идей'" />
            <h3 className="coworkings__item-title title-reset">Территория идей</h3>
            <div className="coworkings__item-content">
              <span className="coworkings__item-content-title">Режим работы</span>
              <span className="coworkings__item-content-info">с&nbsp;8:00 до&nbsp;18:00</span>
            </div>
          </li>
          <li className="coworkings__list-item">
            <img className="coworkings__item-img" src="img/antresoli_1.jpg" alt="Коворкинг 'Антресоли'" />
            <h3 className="coworkings__item-title title-reset">Антресоли</h3>
            <div className="coworkings__item-content">
              <span className="coworkings__item-content-title">Режим работы</span>
              <span className="coworkings__item-content-info">с&nbsp;10:00 до&nbsp;16:00,<br />по&nbsp;заявкам</span>
            </div>
          </li>
        </ul>
      </article>
    </Layout>
  );
}
