import { BookingStatus } from '../booking-status';
import { SeatDto } from '../api-shared/seat-dto';

export type BookingResponseDto = {
  id: number;
  seat: SeatDto;
  session_start: string | Date;
  session_end: string | Date;
  status: BookingStatus;
  created_at: string | Date;
}
