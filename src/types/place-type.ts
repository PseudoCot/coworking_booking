import { PlaceTypes } from '../consts';
import { ValueOf } from './value-of';

export type PlaceType = ValueOf<typeof PlaceTypes>;
