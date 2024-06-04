import { WeekdayNumber } from '../weekday-number';

export type CreateScheduleDto = {
  week_day: WeekdayNumber;
  start_time: string; // time
  end_time: string; // time
};
