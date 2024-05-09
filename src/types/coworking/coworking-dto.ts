import { CoworkingImageDto } from './coworking-image-dto';
import { DayOfDto } from '../api-shared/day-of-dto';
import { ScheduleDto } from '../api-shared/schedule-dto';
import { SeatDto } from '../api-shared/seat-dto';

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
