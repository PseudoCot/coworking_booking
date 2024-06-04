import { CreateScheduleDto } from './create-schedule-dto';

export type CreateScheduleRequestParams = {
  coworking_id: string;
  schedules: CreateScheduleDto[];
};
