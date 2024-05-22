import { Routes, Route } from 'react-router-dom';
import MainScreen from './pages/main-screen';
import ErrorScreen from './pages/error-screen';
import PrivateRoute from './components/private-route';
import { AppRoutes } from './routes';
import HistoryRouter from './components/history-route';
import browserHistory from './browser-history';
import RegisterScreen from './pages/register-screen';
import LoginScreen from './pages/login-screen';
import UserAccScreen from './pages/user-acc-screen';
import NewPasswordScreen from './pages/new-password-screen';
import CoworkingsScreen from './pages/coworkings-screen';
import CalendarScreen from './pages/calendar-screen';
import BookingScreen from './pages/booking-screen';
import PasswordRecoveryScreen from './pages/password-recovery-screen';

export default function App(): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoutes.Main.FullPath} element={<MainScreen />} />
        <Route path={AppRoutes.Coworkings.FullPath}>
          <Route index element={<CoworkingsScreen />} />
          <Route path={AppRoutes.Booking.FullPath} element={
            <PrivateRoute> <BookingScreen /> </PrivateRoute>
          }
          />
        </Route>
        <Route path={AppRoutes.Calendar.FullPath} element={<CalendarScreen />} />

        <Route path={AppRoutes.Register.FullPath} element={<RegisterScreen />} />
        <Route path={AppRoutes.Login.FullPath} element={<LoginScreen />} />
        <Route path={AppRoutes.User.FullPath} element={
          <PrivateRoute> <UserAccScreen /> </PrivateRoute>
        }
        />
        <Route path={AppRoutes.ChangePassword.FullPath} element={
          <PrivateRoute> <NewPasswordScreen /> </PrivateRoute>
        }
        />
        <Route path={AppRoutes.PasswordRecovery.FullPath} element={<PasswordRecoveryScreen />} />

        <Route path={AppRoutes.Error.FullPath} element={<ErrorScreen errorStatusCode={404} />} />
      </Routes>
    </HistoryRouter>
  );
}
