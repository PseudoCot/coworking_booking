// import CoworkingList from '../components/coworking-list';
// import CoworkingSearchForm from '../components/coworking-search-form';
import Layout from '../components/layout';
import SeatsEditingForm from '../components/seats-editing-form';

export default function CoworkingsScreen(): JSX.Element {
  return (
    <Layout>
      <article className="coworkings">
        <h1 className="coworkings__title title title-reset">Коворкинги</h1>

        {/* <CoworkingSearchForm />

        <CoworkingList /> */}

        <SeatsEditingForm coworkingId={'123'} />
      </article>
    </Layout>
  );
}
