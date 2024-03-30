import { Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { AuthStatus } from '../consts';
import { useAppSelector } from '../hooks';
import { getAuthStatus } from '../store/user-process/selectors';
import { ROUTES } from '../routes';

export type PrivateRouteProps = PropsWithChildren;

export default function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  return (
    authStatus === AuthStatus.Auth
      ? children as JSX.Element
      : <Navigate to={ROUTES.login.fullPath} />
  );
}
