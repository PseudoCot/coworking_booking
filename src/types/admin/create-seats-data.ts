import { CreateSeatDto } from './create-seat-dto';

export type CreateSeatsData = {
  meetingRooms: CreateSeatDto[];
  coworkingId: string;
  tablePlaces: number;
};
