import { PlaceType } from '../place-type';

export type BookingDto = {
  coworking_id: string;
  place_type: PlaceType;
  session_start: string | Date;
  session_end: string | Date;
};
