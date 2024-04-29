import { NameSpaces } from '../../consts';
import { CoworkingData } from '../../types/coworking-data';
import { State } from '../../types/state';

export const isFetchingCoworking = (state: State): boolean => state[NameSpaces.Coworking].coworkingFetching;
export const isCoworkingFetchingRejected = (state: State): boolean => state[NameSpaces.Coworking].coworkingFetchingError;
export const getCoworkingData = (state: State): CoworkingData | undefined => state[NameSpaces.Coworking].coworkingData;
