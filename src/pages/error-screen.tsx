import Layout from '../components/layout';

export type ErrorScreenProps = {
  errorStatusCode?: number;
};

export default function ErrorScreen({ errorStatusCode }: ErrorScreenProps): JSX.Element {
  return (
    <Layout>
      <div>An error occured {errorStatusCode}</div>
    </Layout>
  );
}
