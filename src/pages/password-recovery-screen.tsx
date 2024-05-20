import { useSearchParams } from 'react-router-dom';
import ChangePasswordForm from '../components/change-password-form';
import Layout from '../components/layout';
import RequestPasswordRecoveryForm from '../components/request-password-recovery-form';

export default function PasswordRecoveryScreen(): JSX.Element {
  const [queryParams] = useSearchParams();
  const [token, email] = [queryParams.get('token'), queryParams.get('email')];

  return (
    <Layout>
      <article className="password-recovery">
        {token && email
          ? <ChangePasswordForm token={token} email={email} />
          : <RequestPasswordRecoveryForm />}
      </article>
    </Layout>
  );
}
