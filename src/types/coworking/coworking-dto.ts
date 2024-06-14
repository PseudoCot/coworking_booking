import { CoworkingImageDto } from './coworking-image-dto';
import { ScheduleDto } from '../api-shared/schedule-dto';
import { SeatDto } from '../api-shared/seat-dto';
import { EventDto } from '../api-shared/event-dto';
import { CoworkingCapabilityDto } from '../api-shared/coworking-capability-dto';

export type CoworkingDto = {
  id: string;
  avatar?: string;
  title: string;
  institute: string;
  description: string;
  address: string;
  seats?: SeatDto[];
  working_schedules?: ScheduleDto[];
  images?: CoworkingImageDto[];
  events?: EventDto[];
  technical_capabilities?: CoworkingCapabilityDto[];
};
