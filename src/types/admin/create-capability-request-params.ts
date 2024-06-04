import { CoworkingCapabilityDto } from '../api-shared/coworking-capability-dto';

export type CreateCapabilityRequestParams = {
  coworking_id: string;
  capabilities: CoworkingCapabilityDto[];
}
