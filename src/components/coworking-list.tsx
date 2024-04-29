import { useAppSelector } from '../hooks';
import { getCoworkingsData } from '../store/coworkings-process/selectors';
import CoworkingMiniCard from './coworking-mini-card';

export default function CoworkingList(): JSX.Element {
  const coworkings = useAppSelector(getCoworkingsData);

  return (
    <ul className="coworkings__list list-reset">
      {coworkings && coworkings.map((coworking) => (
        <CoworkingMiniCard key={coworking.id} {...coworking} />
      ))}
    </ul>
  );
}
