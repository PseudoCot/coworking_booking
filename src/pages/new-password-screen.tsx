import Layout from '../components/layout';
import ChangePasswordForm from '../components/change-password-form';

export default function NewPasswordScreen(): JSX.Element {
  return (
    <Layout>
      <article className="new-password">
        <ChangePasswordForm />
      </article>
    </Layout>
  );
}
