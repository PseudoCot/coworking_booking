import { CreateCoworkingDto } from './create-coworking-dto';

export type CreateCoworkingRequestParams = {
  coworking: Omit<CreateCoworkingDto, 'avatar' | 'images'>;
}
