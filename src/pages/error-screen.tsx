import Layout from '../components/layout';

export type ErrorScreenProps = {
  errorStatusCode?: number;
};

export default function ErrorScreen({ errorStatusCode }: ErrorScreenProps): JSX.Element {
  return (
    <Layout>
      <article className='error-screen'>
        <h1 className='error-screen__title title-reset'>
          Произошла непредвиденная<br />ошибка {errorStatusCode}
        </h1>
      </article>
    </Layout>
  );
}
