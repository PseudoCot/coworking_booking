import { useAppSelector } from '.';
import { getUserFirstName, getUserLastName } from '../store/user-process/selectors';

export default function useUserFullName() {
  const lastName = useAppSelector(getUserLastName);
  const firstName = useAppSelector(getUserFirstName);
  return lastName && firstName
    ? `${lastName} ${firstName}`
    : undefined;
}
