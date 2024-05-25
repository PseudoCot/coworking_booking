import { PlaceTypeOptions } from '../consts';

export type PlaceType = (typeof PlaceTypeOptions)[number]['value'];
