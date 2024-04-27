import CoworkingMiniCard from '../components/coworking-mini-card';
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
          <CoworkingMiniCard imgUrl='img/cow-irit.jpg' title='ИРИТ - РТФ' openingTime='10:00' closingTime='16:00' />
          <CoworkingMiniCard imgUrl='img/idea-terr.jpg' title='Территория идей' openingTime='8:00' closingTime='18:00' />
          <CoworkingMiniCard imgUrl='img/antresoli_1.jpg' title='Антресоли' openingTime='10:00' closingTime='16:00' optionalText='по&nbsp;заявкам' />
        </ul>
      </article>
    </Layout>
  );
}
