import Layout from '../components/layout';
import PasswordRecoveryForm from '../components/password-recovery-form';

export default function PasswordRecoveryScreen(): JSX.Element {
  return (
    <Layout>
      <article className="password-recovery">
        <PasswordRecoveryForm />
      </article>
    </Layout>
  );
}
