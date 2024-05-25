import { ScheduleDto } from '../api-shared/schedule-dto';

export type CoworkingShortData = {
  id: string;
  avatar?: string;
  title: string;
  institute: string;
  description: string;
  address: string;
  workingSchedule?: ScheduleDto;
};
