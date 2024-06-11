import { NameSpaces } from '../../consts';
import { FetchingStatus } from '../../types/fetching-status';
import { State } from '../../types/state';

export const getBookFetchingStatus = (state: State): FetchingStatus => state[NameSpaces.Booking].bookFetchingStatus;
export const getBookedEventLink = (state: State): string | undefined => state[NameSpaces.Booking].bookedEventLink;
