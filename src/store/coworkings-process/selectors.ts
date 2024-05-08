import { NameSpaces } from '../../consts';
import { CoworkingShortData } from '../../types/coworking/coworking-short-data';
import { State } from '../../types/state';

export const isFetchingCoworkings = (state: State): boolean => state[NameSpaces.Coworkings].coworkingsFetching;
export const isCoworkingsFetchingRejected = (state: State): boolean => state[NameSpaces.Coworkings].coworkingsFetchingError;
export const getCoworkingsData = (state: State): CoworkingShortData[] | undefined => state[NameSpaces.Coworkings].coworkingsData;
