import { PlaceType } from '../place-type';

export type BookingRequestParams = {
  reservation: {
    coworking_id: string;
    place_type: PlaceType;
    session_start: string; // format datetime
    session_end: string; // format datetime
  };
};
