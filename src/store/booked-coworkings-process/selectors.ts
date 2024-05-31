import { NameSpaces } from '../../consts';
import { BookedCoworkingDto } from '../../types/booking/booked-coworking-dto';
import { CoworkingDto } from '../../types/coworking/coworking-dto';
import { State } from '../../types/state';

export const isBookedCoworkingsFetching = (state: State): boolean => state[NameSpaces.BookedCoworkings].coworkingsFetching;
export const isBookedCoworkingsFetchingRejected = (state: State): boolean => state[NameSpaces.BookedCoworkings].coworkingsFetchingError;

export const getBookingsDto = (state: State): BookedCoworkingDto[] | undefined => state[NameSpaces.BookedCoworkings].bookingsDto;
export const getBookedCoworkingsFullDto = (state: State): { [key: string]: CoworkingDto } => state[NameSpaces.BookedCoworkings].coworkingsFullDto;
