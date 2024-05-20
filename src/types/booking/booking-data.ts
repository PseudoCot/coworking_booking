import { PlaceType } from '../place-type';

export type BookingData = {
  coworkingId: string;
  placeType: PlaceType;
  from: string;
  to: string;
};
