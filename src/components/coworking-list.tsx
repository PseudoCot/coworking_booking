import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getCoworkingsData, isCoworkingsFetching } from '../store/coworkings-process/selectors';
import CoworkingMiniCard from './coworking-mini-card';
import Loader from './loader';
import { clearCoworkingsData } from '../store/coworkings-process/coworkings-process';

export default function CoworkingList(): JSX.Element {
  const dispatch = useAppDispatch();

  const coworkings = useAppSelector(getCoworkingsData);
  const coworkingsFetching = useAppSelector(isCoworkingsFetching);

  useEffect(() => () => {
    dispatch(clearCoworkingsData());
  }, [dispatch]);

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
