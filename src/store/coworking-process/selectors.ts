import { NameSpaces } from '../../consts';
import { CoworkingDto } from '../../types/coworking/coworking-dto';
import { State } from '../../types/state';

export const isCoworkingFetching = (state: State): boolean => state[NameSpaces.Coworking].coworkingFetching;
export const isCoworkingFetchingRejected = (state: State): boolean => state[NameSpaces.Coworking].coworkingFetchingError;

export const getCoworkingDto = (state: State): CoworkingDto | undefined => state[NameSpaces.Coworking].coworkingDto;
export const getCoworkingId = (state: State): string | undefined => state[NameSpaces.Coworking].coworkingDto?.id;
