import { Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { AuthStatuses } from '../consts';
import { useAppSelector } from '../hooks';
import { getAuthStatus } from '../store/user-process/selectors';
import { AppRoutes } from '../routes';

export type PrivateRouteProps = PropsWithChildren;

export default function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  return authStatus === AuthStatuses.Auth || import.meta.env.VITE_DEV_ALLOW_PRIVATE_PAGES === 'false' //temp
    ? children as JSX.Element
    : <Navigate to={AppRoutes.Login.FullPath} />;
}
