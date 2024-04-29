import Layout from '../components/layout';
import NewPasswordForm from '../components/new-password-form';

export default function NewPasswordScreen(): JSX.Element {
  return (
    <Layout>
      <article className="new-password">
        <NewPasswordForm />
      </article>
    </Layout>
  );
}
