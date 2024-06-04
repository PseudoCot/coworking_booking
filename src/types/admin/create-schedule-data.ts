import { CreateScheduleDto } from './create-schedule-dto';

export type CreateScheduleData = {
  coworkingId: string;
  schedules: CreateScheduleDto[];
};
