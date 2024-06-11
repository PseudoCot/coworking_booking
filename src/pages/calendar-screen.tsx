import Calendar from '../components/calendar';
import CoworkingList from '../components/coworking-list';
import Layout from '../components/layout';
import { useAppSelector } from '../hooks';
import { getCoworkingsData } from '../store/coworkings-process/selectors';

export default function CalendarScreen(): JSX.Element {
  const coworkingsDto = useAppSelector(getCoworkingsData);

  return (
    <Layout>
      <article className="calendar">
        <h1 className="calendar__title title title-reset">Календарь</h1>

        <Calendar />

        <div className="calendar__coworking-list">
          {coworkingsDto && coworkingsDto?.length > 0 &&
            <h2 className="coworkings__list-title title-reset">Доступные коворкинги</h2>}
          <CoworkingList />
        </div>
      </article>
    </Layout>
  );
}
