import { CreateSeatDto } from './create-seat-dto';

export type CreateSeatsRequestParams = {
  meeting_rooms: CreateSeatDto[];
  coworking_id: string;
  table_places: number;
};
