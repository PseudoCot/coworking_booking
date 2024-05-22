import { useAppSelector } from '.';
import { getUserData } from '../store/user-process/selectors';
import { UserData } from '../types/user/user-data';

export default function useUserData() {
  const userData = useAppSelector(getUserData);
  return userData.id
    ? userData as UserData
    : undefined;
}
