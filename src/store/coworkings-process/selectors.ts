import { NameSpaces } from '../../consts';
import { CoworkingsSearchDto } from '../../types/api-shared/search-dto';
import { CoworkingShortDto } from '../../types/coworking/coworking-short-dto';
import { State } from '../../types/state';

export const isCoworkingsFetching = (state: State): boolean => state[NameSpaces.Coworkings].coworkingsFetching;
export const isCoworkingsFetchingRejected = (state: State): boolean => state[NameSpaces.Coworkings].coworkingsFetchingError;

export const getCoworkingsSearchParams = (state: State): CoworkingsSearchDto | undefined => state[NameSpaces.Coworkings].searchParams;

export const getCoworkingsData = (state: State): CoworkingShortDto[] | undefined => state[NameSpaces.Coworkings].coworkingsDto;
