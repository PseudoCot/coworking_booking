import { Routes, Route } from 'react-router-dom';
import MainScreen from './pages/main-screen';
import SignInScreen from './pages/sign-in-screen';
import ErrorScreen from './pages/error-screen';
import PrivateRoute from './components/private-route';
import { ROUTES } from './routes';
import HistoryRouter from './components/history-route';
import browserHistory from './browser-history';

export type AppProps = {};

export default function App(props: AppProps): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={ROUTES.main.fullPath} element={<MainScreen />} />
        <Route path={ROUTES.login.fullPath} element={<SignInScreen />} />
        <Route path={ROUTES.error.fullPath} element={<ErrorScreen errorStatusCode={404} />} />
      </Routes>
    </HistoryRouter>
  );
}
