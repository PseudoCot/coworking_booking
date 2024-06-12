import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { AdminFetchingField, resetAdminFetchingStatus } from '../store/admin-process/admin-process';
import { createAdminFetchingStatusGetter } from '../store/admin-process/selectors';

export function useAdminFetchingStatus(type: AdminFetchingField) {
  const dispatch = useAppDispatch();
  const fetchingStatus = useAppSelector(createAdminFetchingStatusGetter(type));

  useEffect(() => {
    dispatch(resetAdminFetchingStatus(type));

    return () => {
      dispatch(resetAdminFetchingStatus(type));
    };
  }, [dispatch, type]);

  return fetchingStatus;
}
