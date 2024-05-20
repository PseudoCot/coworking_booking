import { SeatData } from '../api-shared/seat-data';
import { BookingStatus } from '../booking-status';

export type BookedCoworkingData = {
  id: number;
  from: string;
  to: string;
  seat: SeatData;
  status: BookingStatus;
  createdAt: string;
};
