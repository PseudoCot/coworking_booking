import LoginForm from '../components/login-form';
import Layout from '../components/layout';

export default function LoginScreen(): JSX.Element {
  return (
    <Layout>
      <article className="login">
        <h1 className="login__title cb-title title-reset">Авторизация</h1>

        <LoginForm />
      </article>
    </Layout>
  );
}
