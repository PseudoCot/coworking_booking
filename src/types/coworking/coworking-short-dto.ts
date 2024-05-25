import { ScheduleDto } from '../api-shared/schedule-dto';

export type CoworkingShortDto = {
  id: string;
  avatar?: string;
  title: string;
  institute: string;
  description: string;
  address: string;
  working_schedule?: ScheduleDto;
};
