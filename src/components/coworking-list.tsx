import { useAppSelector } from '../hooks';
import { getCoworkingsData, isCoworkingsFetching } from '../store/coworkings-process/selectors';
import CoworkingMiniCard from './coworking-mini-card';
import Loader from './loader';

export default function CoworkingList(): JSX.Element {
  const coworkings = useAppSelector(getCoworkingsData);
  const coworkingsFetching = useAppSelector(isCoworkingsFetching);

  return (
    <ul className="coworkings__list list-reset">
      {coworkings?.length
        ? coworkings.map((coworking) => (
          <CoworkingMiniCard key={coworking.id} {...coworking} />
        ))
        : coworkingsFetching && <Loader />}
    </ul>
  );
}
