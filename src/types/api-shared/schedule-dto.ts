import { WeekdayNumber } from '../weekday-number';

export type ScheduleDto = {
  coworking_id: string;
  week_day: WeekdayNumber;
  start_time: string; // format time
  end_time: string; // format time
};
