import { useAppSelector } from '.';
import { getUserData } from '../store/user-process/selectors';

export default function useUserFullName() {
  const userData = useAppSelector(getUserData);
  return userData
    ? `${userData.lastName} ${userData.firstName}`
    : undefined;
}
