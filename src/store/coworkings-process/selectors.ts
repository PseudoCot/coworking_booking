import { NameSpaces } from '../../consts';
import { SearchDto } from '../../types/api-shared/search-dto';
import { TimestampDto } from '../../types/api-shared/timestamp-dto';
import { CoworkingShortData } from '../../types/coworking/coworking-short-data';
import { State } from '../../types/state';

export const isCoworkingsFetching = (state: State): boolean => state[NameSpaces.Coworkings].coworkingsFetching;
export const isCoworkingsFetchingRejected = (state: State): boolean => state[NameSpaces.Coworkings].coworkingsFetchingError;

export const getCoworkingsSearchParams = (state: State): SearchDto | undefined => state[NameSpaces.Coworkings].searchParams;
export const getCoworkingsTimestampParams = (state: State): TimestampDto | undefined => state[NameSpaces.Coworkings].timestampParams;

export const getCoworkingsData = (state: State): CoworkingShortData[] | undefined => state[NameSpaces.Coworkings].coworkingsDto;
