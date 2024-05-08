import { CoworkingImageDto } from './coworking-image-dto';
import { DayOfDto } from './day-of-dto';
import { ScheduleDto } from './schedule-dto';
import { SeatDto } from './seat-dto';

export type CoworkingDto = {
  id: string;
  avatar: string;
  title: string;
  institute: string;
  description: string;
  address: string;
  seats: SeatDto[];
  working_schedules: ScheduleDto[];
  images: CoworkingImageDto[];
  days_of: DayOfDto[];
};
