import { Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { AuthStatuses, FetchingStatuses } from '../consts';
import { useAppSelector } from '../hooks';
import { getAuthStatus } from '../store/user-process/selectors';
import { AppRoutes } from '../routes';
import { useUserFetchingStatus } from '../hooks/use-user-fetching-status';

export type PrivateRouteProps = PropsWithChildren;

export default function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  const fetchingStatus = useUserFetchingStatus('refreshFetchingStatus');

  return authStatus === AuthStatuses.Auth
    || fetchingStatus === FetchingStatuses.Pending
    || import.meta.env.VITE_DEV_ALLOW_PRIVATE_PAGES === 'true'

    ? children as JSX.Element
    : <Navigate to={AppRoutes.Login.FullPath} />;
}
