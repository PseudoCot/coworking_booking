import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { getUserFetchingStatus } from '../store/user-process/selectors';
import { UserFetchingField, resetUserFetchingStatus } from '../store/user-process/user-process';

export function useUserFetchingStatus(type: UserFetchingField) {
  const dispatch = useAppDispatch();
  const fetchingStatus = useAppSelector(getUserFetchingStatus(type));

  useEffect(() => {
    dispatch(resetUserFetchingStatus(type));

    return () => {
      dispatch(resetUserFetchingStatus(type));
    };
  }, [dispatch, type]);
  return fetchingStatus;
}
