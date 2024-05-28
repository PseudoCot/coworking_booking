import CoworkingSearchForm from '../components/coworking-search-form';
import Layout from '../components/layout';

export default function MainScreen(): JSX.Element {
  return (
    <Layout>
      <article className="hero">
        <h1 className="hero__title title-reset">Там, где творчество встречает комфорт</h1>

        <CoworkingSearchForm inMainScreen />
      </article>
    </Layout>
  );
}
