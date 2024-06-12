import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { createUserFetchingStatusGetter } from '../store/user-process/selectors';
import { UserFetchingField, resetUserFetchingStatus } from '../store/user-process/user-process';

export function useUserFetchingStatus(type: UserFetchingField) {
  const dispatch = useAppDispatch();
  const fetchingStatus = useAppSelector(createUserFetchingStatusGetter(type));

  useEffect(() => {
    dispatch(resetUserFetchingStatus(type));

    return () => {
      dispatch(resetUserFetchingStatus(type));
    };
  }, [dispatch, type]);

  return fetchingStatus;
}
