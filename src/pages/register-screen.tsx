import Layout from '../components/layout';
import RegisterForm from '../components/register-form';

export default function RegisterScreen(): JSX.Element {
  return (
    <Layout>
      <article className="register">
        <h1 className="register__title cb-title title-reset">Регистрация</h1>

        <RegisterForm />
      </article>
    </Layout>
  );
}
