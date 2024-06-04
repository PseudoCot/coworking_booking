import { CoworkingCapabilityDto } from '../api-shared/coworking-capability-dto';

export type CreateCapabilityData = {
  coworkingId: string;
  capabilities: CoworkingCapabilityDto[];
};
