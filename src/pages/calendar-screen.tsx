import Layout from '../components/layout';

type CalendarScreenProps = {};

export default function CalendarScreen({ }: CalendarScreenProps): JSX.Element {
  return (
    <Layout>
      <article className="calendar">
        <h1 className="calendar__title cb-title title-reset">Календарь</h1>

        <div className="calendar__iframe-wrapper">
          <iframe className="calendar__iframe"
            src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Asia%2FYekaterinburg&bgcolor=%23E3F2FD&showPrint=0&showCalendars=0&title=%D0%A0%D0%B0%D1%81%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5&src=NWFkMGU2NGFmOGUzZjg5OTJlNmMzYmYzNDM3ZDJmZjhjZmY2MWVhYjYyMGZiMjBkYTBlYzU3YjZkMzAyNWQyM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=cnUucnVzc2lhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D81B60&color=%230B8043"
            width="930" height="600" frameBorder="0" scrolling="no"
          >
          </iframe>
          <span className="calendar__iframe-title">Google Calendar загружается...</span>
        </div>

        <div className="calendar__coworking-list">
          <h2 className="coworkings__list-title title-reset">Доступные коворкинги</h2>
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
              <img className="coworkings__item-img" src="img/antresoli_1.jpg" alt="Коворкинг 'Антресоли'" />
              <h3 className="coworkings__item-title title-reset">Антресоли</h3>
              <div className="coworkings__item-content">
                <span className="coworkings__item-content-title">Режим работы</span>
                <span className="coworkings__item-content-info">с&nbsp;10:00 до&nbsp;16:00,<br />по&nbsp;заявкам</span>
              </div>
            </li>
          </ul>
        </div>
      </article>
    </Layout>
  );
}
