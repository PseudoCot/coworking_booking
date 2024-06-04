import CoworkingCreatingForm from '../components/coworking-creating-form';
// import CoworkingList from '../components/coworking-list';
// import CoworkingSearchForm from '../components/coworking-search-form';
import Layout from '../components/layout';

export default function CoworkingsScreen(): JSX.Element {
  return (
    <Layout>
      <article className="coworkings">
        <h1 className="coworkings__title cb-title title-reset">Коворкинги</h1>

        {/* <CoworkingSearchForm />

        <CoworkingList /> */}

        <CoworkingCreatingForm />
      </article>
    </Layout>
  );
}
