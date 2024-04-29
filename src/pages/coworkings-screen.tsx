import CoworkingList from '../components/coworking-list';
import CoworkingSearshingForm from '../components/coworking-searching-form';
import Layout from '../components/layout';

export default function CoworkingsScreen(): JSX.Element {
  return (
    <Layout>
      <article className="coworkings">
        <h1 className="coworkings__title cb-title title-reset">Коворкинги</h1>

        <CoworkingSearshingForm />

        <CoworkingList />
      </article>
    </Layout>
  );
}
