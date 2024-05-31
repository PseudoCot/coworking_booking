import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getBookingsDto, getBookedCoworkingsFullDto, isBookedCoworkingsFetching } from '../store/booked-coworkings-process/selectors';
import { fetchBookedCoworkingsAction } from '../store/api-actions';
import { clearBookedCoworkingsFullDto } from '../store/booked-coworkings-process/booked-coworkings-process';
import Loader from './loader';
import BookedCoworkingCard from './booked-coworking-card';

export default function BookedCoworkingList(): JSX.Element {
  const dispatch = useAppDispatch();

  const coworkingsFetching = useAppSelector(isBookedCoworkingsFetching);

  const bookings = useAppSelector(getBookingsDto);
  const fullCoworkings = useAppSelector(getBookedCoworkingsFullDto);
  const fullCoworkingsIds = Object.keys(fullCoworkings);

  useEffect(() => {
    dispatch(fetchBookedCoworkingsAction());

    return () => {
      dispatch(clearBookedCoworkingsFullDto());
    };
  }, [dispatch]);

  if (coworkingsFetching) {
    return <Loader horizontalAlignCenter />;
  }

  return bookings?.length && fullCoworkingsIds.length
    ?
    <>
      <h2 className="user-acc__booked-list-title title-reset">Мои бронирования</h2>
      <ul className="user-acc__booked-list list-reset">
        {bookings.map((booking) => {
          const fullCoworkingDto = fullCoworkings[booking.seat.coworking_id];
          return fullCoworkingDto &&
            <BookedCoworkingCard key={booking.id} {...fullCoworkingDto} {...booking} />;
        })}
      </ul>
    </>
    : <h2 className="user-acc__booked-list-title title-reset">Ничего не забронировано</h2>;
}
