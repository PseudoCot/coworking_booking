import { EventDto } from '../api-shared/event-dto';
import { ScheduleDto } from '../api-shared/schedule-dto';
import { SeatDto } from '../api-shared/seat-dto';
import { TechnicalCapabilityDto } from '../api-shared/technical-capability-dto';
import { CoworkingImageDto } from './coworking-image-dto';

export type CoworkingData = {
  id: string;
  avatar?: string;
  title: string;
  institute: string;
  description: string;
  address: string;

  seats: SeatDto[];
  workingSchedules: ScheduleDto[];
  images: CoworkingImageDto[];
  events: EventDto[];
  technicalCapabilities: TechnicalCapabilityDto[];
};
