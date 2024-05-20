import { PlaceType } from '../place-type';

export type SeatData = {
  id: number;
  coworkingId: string;
  label: string;
  description: string;
  placeType: PlaceType;
  seatsCount: number;
};
