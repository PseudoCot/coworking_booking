import AuthForm from '../components/auth-form';
import Layout from '../components/layout';

export default function AuthScreen(): JSX.Element {
  return (
    <Layout>
      <article className="auth">
        <h1 className="auth__title cb-title title-reset">Авторизация</h1>

        <AuthForm />
      </article>
    </Layout>
  );
}
