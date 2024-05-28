import { NameSpaces } from '../../consts';
import { State } from '../../types/state';

export const isBookRequesting = (state: State): boolean => state[NameSpaces.Booking].bookRequesting;
export const isBookingSucces = (state: State): boolean => state[NameSpaces.Booking].bookingSuccess;
export const isBookingError = (state: State): boolean => state[NameSpaces.Booking].bookingError;
export const getBookedEventLink = (state: State): string | undefined => state[NameSpaces.Booking].bookedEventLink;
