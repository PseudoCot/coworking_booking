import { BookingStatus } from '../booking-status';
import { SeatDto } from '../api-shared/seat-dto';
import { CoworkingShortDto } from '../coworking/coworking-short-dto';

export type BookedCoworkingDto = {
  id: number;
  seat: SeatDto;
  coworking: CoworkingShortDto;
  session_start: string; // format datetime
  session_end: string; // format datetime
  status: BookingStatus;
  created_at: string; // format datetime
}
