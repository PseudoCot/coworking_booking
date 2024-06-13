import { NameSpaces } from '../../consts';
import { CoworkingCapabilityDto } from '../../types/api-shared/coworking-capability-dto';
import { ScheduleDto } from '../../types/api-shared/schedule-dto';
import { SeatDto } from '../../types/api-shared/seat-dto';
import { CoworkingDto } from '../../types/coworking/coworking-dto';
import { State } from '../../types/state';

export const isCoworkingFetching = (state: State): boolean => state[NameSpaces.Coworking].coworkingFetching;
export const isCoworkingFetchingRejected = (state: State): boolean => state[NameSpaces.Coworking].coworkingFetchingError;

export const getCoworkingDto = (state: State): CoworkingDto | undefined => state[NameSpaces.Coworking].coworkingDto;
export const getCoworkingId = (state: State): string | undefined => state[NameSpaces.Coworking].coworkingDto?.id;
export const getCoworkingCapabilities = (state: State): CoworkingCapabilityDto[] | undefined =>
  state[NameSpaces.Coworking].coworkingDto?.technical_capabilities;
export const getCoworkingSeats = (state: State): SeatDto[] | undefined => state[NameSpaces.Coworking].coworkingDto?.seats;
export const getCoworkingSchedule = (state: State): ScheduleDto[] | undefined => state[NameSpaces.Coworking].coworkingDto?.working_schedules;
