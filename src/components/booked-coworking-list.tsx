import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getBookingsDto, isBookedCoworkingsFetching } from '../store/booked-coworkings-process/selectors';
import { fetchBookedCoworkingsAction } from '../store/api-actions';
import Loader from './loader';
import BookedCoworkingCard from './booked-coworking-card';

export default function BookedCoworkingList(): JSX.Element {
  const dispatch = useAppDispatch();

  const coworkingsFetching = useAppSelector(isBookedCoworkingsFetching);
  const bookings = useAppSelector(getBookingsDto);

  useEffect(() => {
    dispatch(fetchBookedCoworkingsAction());
  }, [dispatch]);

  if (coworkingsFetching) {
    return <Loader horizontalAlignCenter />;
  }

  return bookings?.length
    ?
    <>
      <h2 className="user-acc__booked-list-title title-reset">Мои бронирования</h2>
      <ul className="user-acc__booked-list list-reset">
        {bookings.map((booking) => (
          <BookedCoworkingCard key={booking.id} {...booking} />
        ))}
      </ul>
    </>
    : <h2 className="user-acc__booked-list-title title-reset">Ничего не забронировано</h2>;
}
