import { CreateEventDto } from './create-event-dto';

export type CreateEventRequestParams = {
  coworking_id: string;
  event: CreateEventDto;
};
